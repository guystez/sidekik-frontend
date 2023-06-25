import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './Login';

const Chatbox = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [question_id_final, setQuestion_id_final] = useState('');
  const [questions, setQuestions] = useState([]);
  const [returnedanswer, setReturnedanswer] = useState([]);
  const [answers, setAnswers] = useState({});  
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  

  const handleNewQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleAnswerChange = (id) => (event) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [id]: event.target.value, 
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const username = localStorage.getItem('username');

      axios.get(`http://127.0.0.1:8000/app/extract_answer/?users_question_id=${question_id_final}&username=${username}`)
        .then(response => {
          console.log('API Response: ', response);
          console.log(response.data,'dayayaya');
          if (Array.isArray(response.data)) {
            setReturnedanswer(response.data);
          } else {
            setReturnedanswer([]);
          }
        })
        .catch(console.error);
    }, 10000); // Check for new answer every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [question_id_final, answersSubmitted]);
  
  useEffect(() => {
    const username = localStorage.getItem('username');
    axios.get(`http://127.0.0.1:8000/app/extract_question/?username=${username}`)
    .then(response => {
        setQuestions([response.data]);  // Wrap response.data in an array
    })
    .catch(console.error);
}, [answersSubmitted]);


  const handleSubmitAnswers = (event) => {
    event.preventDefault();
    for (const questionId in answers) {
      setQuestion_id_final(questionId)
      axios.post('http://127.0.0.1:8000/app/insert_answer/', {
        users_question_id: questionId,
        answer: answers[questionId]
      })
    //   console.log(questionId,'quesitionIDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
      .then(response => {
        console.log(response.data);
        setAnswersSubmitted(prevState => !prevState);
      })
      .catch(error => {
        console.error(error);
      });
    }
    setAnswers({});
  };

  const username1 = localStorage.getItem('username');
  
  const submitNewQuestion = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/app/generate_question/', {
      username: username1,
      question: newQuestion,
    })
    .then(response => {
      console.log(response.data,'dfdfdfd');
    })
    .catch(error => {
      console.error(error);
    });
    setNewQuestion('');
  };

  return (
    <div>
        {returnedanswer.map((item, index) => (
          <div key={index}>{item.users_answer}</div>
        ))}
      <h2>Question</h2>
      <form onSubmit={handleSubmitAnswers}>
        {questions.map((q, index) => (
            
          <div key={q.users_question_id}>
            Question: {q.users_question}
            
            <input
              type="text"
              value={answers[q.users_question_id] || ''}
              onChange={handleAnswerChange(q.users_question_id)}
            />
          </div>
          
        ))}
        
        <button type="submit">Submit Answers</button>
      </form>
      <form onSubmit={submitNewQuestion}>
        <input
          type="text"
          placeholder="Write a new question"
          value={newQuestion}
          onChange={handleNewQuestionChange}
        />
        <button type="submit">Submit Question</button>
      </form>
    </div>
  );
};

export default Chatbox;
