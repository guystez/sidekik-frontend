import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Openers from './Openers';
import Card from 'react-bootstrap/Card';

const Search = ({logout}) => {
  const [searchText, setSearchText] = useState('');
  const [info, infoSearchText] = useState('');
  const [output, setOutput] = useState('');
  const [output1, setOutput2] = useState('');
  const [outputs, setOutputs] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('search');
  const [cart, setCart] = useState([]);
  const [chat_room, setChat_room] = useState([]);
  const uniqueChatRooms = [...new Set(chat_room.map(item => item.chat_room_id))];
  const [history, setHistory] = useState([]);
  const pageRef = useRef(null);
  const [count, setCount] = useState(0);
  const [newroomId, setnewRoomId] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [question_id_final, setQuestion_id_final] = useState('');
  const [questions, setQuestions] = useState([]);
  const [returnedanswer, setReturnedanswer] = useState([]);
  const [answers, setAnswers] = useState({});  
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  // setChatroomdata newchatroomid
  const [Chatroomdata, setChatroomdata] = useState([]);
  const [created, setCreated] = useState([]);
  // const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const savedData = localStorage.getItem('answeredQuestions');
    return savedData ? JSON.parse(savedData) : [];
  });
 
  const [newAnswerCount, setNewAnswerCount] = useState(0);
  const [fetchedAnswers, setFetchedAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [communitytext, setcommunitytext] = useState([]);
  
  
  const deleteChatRoom = (roomId) => {
    const username = localStorage.getItem('username');
    localStorage.removeItem('newroomId')
    axios.delete(`http://127.0.0.1:8000/app/delete_room/${roomId}/?username=${username}`)
      .then(response => {
        // Handle the response from the server
        console.log(response.data);
  
        // Remove the deleted room from the local state as well
        setChat_room(prevChatRooms => prevChatRooms.filter(room => room !== roomId));
        setHistory([]);
        localStorage.setItem('chatHistory', JSON.stringify([]));
  
        // Fetch the new list of chat rooms
        fetchChatRooms();
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const fetchChatRooms = () => {
    const username = localStorage.getItem('username');
    axios.get(`http://127.0.0.1:8000/app/chat_room/?user=${username}`)
      .then(response => {
        setChat_room(response.data);
        console.log(response.data,'dudu');
        const chatRooms1 = response.data;
          // setChat_room(chatRooms1);
        // localStorage.setItem('newroomId', response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
    // Code to fetch the updated list of chat rooms
    // Then use setChat_room to update the state with the new list
  
    const fetchChatRooms2 = () => {
      const username = localStorage.getItem('username');
    
      axios.get(`http://127.0.0.1:8000/app/chat_room/?user=${username}`)
        .then(response => {
          const chatRooms = response.data;
          console.log(chatRooms,'chatRoomsssssss');
          setChat_room(chatRooms);
    
          if (chatRooms.length > 0) {
            // Find the chat room with the highest ID
            const highestIdChatRoom = chatRooms.reduce((max, chatRoom) =>
              max.chat_room_id > chatRoom.chat_room_id ? max : chatRoom
            );
    
            // Save the chat room ID in local storage
            localStorage.setItem('newroomId', highestIdChatRoom.chat_room_id);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    


// Put this in the top-level of your component, not inside any functions
useEffect(() => {
  const storedNewRoomId = localStorage.getItem('newroomId');
  if (storedNewRoomId) {
    setnewRoomId(storedNewRoomId);
  }
}, []);


  useEffect(() => {
    // Get chat history from local storage
    let storedChatHistory = localStorage.getItem('chatHistory');
    
    
    // If there is chat history in local storage, parse it and set it to state
    if (storedChatHistory) {
      setHistory(JSON.parse(storedChatHistory));
    }
  }, []);

  const createChatroom = (nextRoomId) => {
    console.log(nextRoomId,'helllooooooo');
    axios.post('http://127.0.0.1:8000/app/create_new_room/', {
      user: username,
      chatroom: nextRoomId
    })
    .then(response => {
      console.log(nextRoomId,'afeerrrrrrr');
      localStorage.setItem('newroomId', nextRoomId);
      console.log(localStorage.getItem('newroomId'),'dammmmmmmmmmmm');
      let newroomid2 =localStorage.getItem('newroomId')

      localStorage.setItem('roomId', JSON.stringify(response.data));
      setHistory([]);
      localStorage.setItem('chatHistory', JSON.stringify([]));
      console.log(response.data,'dataaaa');
      
      setChatroomdata(response.data)
      // Add the new chatroom to the local state
      setChat_room(prevChatRooms => [...prevChatRooms, response.data]);
      
    })
    .catch(error => {
      console.log(error);
    });
  };
  

  const handleClick = () => {
  // Clear roomId and newroomId from local storage
  

  const username11 = localStorage.getItem('username');

  axios.get('http://127.0.0.1:8000/app/get_max_room_id/', {
    params: {
      username: username11
    }
  })
  .then(response => {
    let maxRoomId = response.data.max_chat_room_id; 
    let nextRoomId = parseInt(maxRoomId) + 1; 
    console.log(nextRoomId,'nextRoomId12');
    fetchChatRooms()
    createChatroom(nextRoomId.toString());
    fetchChatRooms();// if i want to show the newchat room when i click 'new chat' so cancle fetchChatRooms(); here
    setHistory([]);
  })
  .catch(error => {
    console.log(error);
  });
};


  

  const fetchChatHistory = (roomId) => {
    
    setnewRoomId(roomId)
    console.log(newroomId,'current chatroom id');
    localStorage.setItem('newroomId', roomId);

    // localStorage.setItem('roomId', roomId);
    axios.get(`http://127.0.0.1:8000/app/chat_history/?chat_room_id=${roomId}&user=${username}`)
      .then(response => {
        



        setHistory(response.data);
        console.log(response.data,'room history');
        
        localStorage.setItem('chatHistory', JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  }
  

const username = localStorage.getItem('username');
  const handleDelete = (itemId) => {
    axios
      .delete(`http://127.0.0.1:8000/app/deletecart/${itemId}/${username}`) // Assuming the API endpoint for deleting an item from the cart is "/app/cart/:id/"
      .then(response => {
        // Handle success response
        console.log('Item deleted:', itemId);
        const updatedCart = cart.filter(item => item.chat.id !== itemId);
        setCart(updatedCart);
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting item:', error);
      });
  };



  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleGetStarted = () => {
    setShowOptions(true);
    setSelectedOption('');
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    axios.get(`http://127.0.0.1:8000/app/chat_room/?user=${username}`)
      .then(response => {
        setChat_room(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // Run only once after component mount

  const fetchCartData = () => {
    const username = localStorage.getItem('username');
    axios.get(`http://127.0.0.1:8000/app/cart/?user=${username}`)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchCartData();
  }, []);
  
  
  
  useEffect(() => {
    if (output) {
    }
  }, [output]);

  useEffect(() => {
    if (output1) {
    }
  }, [output1]);

  function insert_db(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    axios.post('http://localhost:8000/app/insert_db/', {
      info_to_db: info,
    })
      .then(response => {
        setOutput2(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const handleSearchChange2 = (event) => {
    infoSearchText(event.target.value);
  }
  
  const sendToCart = (output, username) => {
    console.log(localStorage.getItem('communitytext'),'communitytext');
    
   
    const data = {
      chat: output,
      user_name: username,
      communitytext:localStorage.getItem('communitytext')
     
    };
  
    axios
      .post('http://127.0.0.1:8000/app/cart/', data, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
      .then(response => {
        // Handle success response
        if (response.data === 'None') {
          alert('cant save this');
          return;
        }
        console.log('Text sent to cart:', response.data);
        fetchCartData(); // Fetch cart data after a new cart item is created
      })
      .catch(error => {
        // Handle error
        console.error('Error sending text to cart:', error);
      });
  };
  

  // console.log(cart.chat.chat,'hhh');
  let inputHistory = [];
  let consecutiveInputs = 0;
  // console.log(roomId,'mmmmmmmmmmmmmmmmmmmmmm');
  
  function phrase_extraction(event, roomId) {
    event.preventDefault(); 
    setSubmitCount(submitCount + 1);
    const newchatroomid =localStorage.getItem('newroomId');
    console.log(newchatroomid,'newchatroomid4');
    
  //   if (newchatroomid === null) {
  //     createChatroom(newchatroomid)
  //     newchatroomid = Chatroomdata;
  //     console.log(newchatroomid,'newchatroomid22');
  // }
  console.log(searchText,'searchText');
  console.log(output,'output');
  console.log(newchatroomid,'newchatroomid');
  console.log(username,'username');
  
    axios.post('http://localhost:8000/app/search/', {
      customer_input: searchText,
      query: searchText,
      response: output.replace(/<\/?b>/g, ''),
      chat_room: newchatroomid,
      username: username
    })
      .then(response => {
        console.log(response.data,'dyyyyyyyy');
        
        console.log(newchatroomid,"newroomIddddddd5");
        
        if (!newchatroomid) {
          fetchChatRooms2();
      } else {
          fetchChatRooms();
      }
        setCreated(newchatroomid)
        let newHistoryItem = { query: searchText, response: 'No matching phrases found.' };
  
        if (response.data.length > 0) {
          setOutput(response.data);
          newHistoryItem.response = output.replace(/<\/?b>/g, '');
        } else {
          setOutput('No matching phrases found.');
        }
  
        setHistory(prevHistory => {
          let newHistory = [...prevHistory, newHistoryItem];
          
          localStorage.setItem('chatHistory', JSON.stringify(newHistory));
          return newHistory;
        });
  
        if (pageRef.current) {
          window.scrollTo({
            top: pageRef.current.offsetTop,
            behavior: 'smooth',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  useEffect(() => {
    setSubmitCount(0);
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  }
  // function Deletefromcart(item.user){
  //   axios.delete(`https://shopping-django-guy-last.onrender.com/product/deletecart/${productId}`)
  //   const newCart = cart.filter(item => item.product.id !== productId)
  //     setCart(newCart)
  // }
  
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
    const username = localStorage.getItem('username');
  
    const fetchAnswers = () => {
      console.log(question_id_final,'question_id_final');
      axios.get(`http://127.0.0.1:8000/app/extract_answer/?users_question_id=${question_id_final}&username=${username}`)
        .then(response => {
          
          if (Array.isArray(response.data)) {
            setFetchedAnswers(response.data);
            if (response.data.length > returnedanswer.length) {
              setNewAnswerCount(response.data.length - returnedanswer.length);
            }
          } else {
            setFetchedAnswers([]);
            setNewAnswerCount(0);
          }
        })
        .catch(console.error);
    };
  
    // Immediately fetch answers once
    fetchAnswers();
  
    const intervalId = setInterval(fetchAnswers, 3000); // Every 3 seconds
  
    // Clean up function
    return () => clearInterval(intervalId);
  }, [returnedanswer]); // useEffect will run again if returnedanswer changes
  


  const handleShow = () => {
    if (showAnswers) {
      setShowAnswers(false);
    } else {
      setReturnedanswer(fetchedAnswers); // Update the answers to be shown
      setShowAnswers(true);
      setNewAnswerCount(0); // Reset the new answer count
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      const username = localStorage.getItem('username');
      axios.get(`http://127.0.0.1:8000/app/extract_question/?username=${username}`)
      .then(response => {
        console.log(response.data,'gtgt');
          setQuestions([response.data]);
          console.log(response.data,'response.dataresponse.data');  // Wrap response.data in an array
      })
      .catch(console.error);
    }, 10000); // Every 10 seconds
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleSubmitAnswers = (event) => {
    event.preventDefault();
    const newAnsweredQuestions = [...answeredQuestions];
    for (const questionId in answers) {
      console.log(questionId,'questionId');
        setQuestion_id_final(questionId)
        axios.post('http://127.0.0.1:8000/app/insert_answer/', {
            users_question_id: questionId,
            answer: answers[questionId]
        })
        .then(response => {
            console.log(response.data);
            setAnswersSubmitted(prevState => !prevState);
        })
        .catch(error => {
            console.error(error);
        });

        newAnsweredQuestions.push(Number(questionId));  // convert to Number before adding
    }
    setAnswers({});
    setAnsweredQuestions(newAnsweredQuestions);  // update the state with the local copy

    // Save to local storage
    localStorage.setItem('answeredQuestions', JSON.stringify(newAnsweredQuestions));
};




  const username1 = localStorage.getItem('username');
  
  const submitNewQuestion = (event) => {
  event.preventDefault();
  console.log(searchText,'searchText22');
  setcommunitytext(searchText)
  localStorage.setItem('communitytext', searchText)
  axios.post('http://127.0.0.1:8000/app/generate_question/', {
    username: username1,
    question: searchText,
  })
  .then(response => {
    console.log(response.data.users_question,'dfdfdfd333');
    
    // Reset states here
    setReturnedanswer([]);
    setNewAnswerCount(0);
  })
  .catch(error => {
    console.error(error);
  });
  setNewQuestion('');
};

  
  return (
    <div className='func_entrance'>
    
      <button className='openers_button' onClick={() => handleOptionSelect('openers')}>Openers</button> <button onClick={() => handleOptionSelect('search')}>Search</button>
      {selectedOption === 'openers' ? (
        <Openers logout={logout} />
      ) : selectedOption === 'search' ? (
        <div className='func_entrance'>
          <h1 className="heading" style={{color:"white"}}>Super Search</h1>
          <nav>
            <ul>
              {localStorage.getItem('username') ? (
                <div>
                  <NavLink 
    to="/home" 
    className="me-auto" 
    onClick={() => { 
      
        localStorage.setItem('chatHistory', JSON.stringify([]));
        localStorage.setItem('newroomId', '');
        window.location.reload(); 
        logout();
    }}
>
    Logout
</NavLink>

                  <div className='me-auto3'>
                    <span className='me-auto3__text'>Logged in as: {localStorage.getItem('username')}</span>
                  </div>
                </div>
              ) : (
                <div>
                  {/* <li><a href="http://localhost:3000/login/">Login</a></li> */}
                  {/* <li><a href="http://localhost:3000/signup/">Signup</a></li> */}
                  {/* <li><a href="http://localhost:3000/upgrade/">Upgrade</a></li> */}
                </div>
              )}
            </ul>
          </nav>
          <div style={{
            // backgroundSize: "cover",
            // position: 'relative',
            // width: '100%',
            // minHeight: "90vh"
          }}>

{/* activating this func will show me att the chat history of the user in the same page. without connection to a specific chat room.
 <div> 
            {chat_room.map((item, index) => (
    <div key={index}>
      {item.response && (
        <div className='history_output'>
          <div className='entrance'>
         
            <b>{localStorage.getItem('username')}:</b> {item.query}
          </div>
          <div className='entrance'>
           
            <b>Sidekik:</b> {item.response}
            <button onClick={() => sendToCart(item.response, localStorage.getItem('username'))}>Like</button>
          </div><br /><br />
        </div>
      )}
    </div>
  ))}
  </div>    */}


          <div>
          {Array.isArray(history) && history.map((item, index) => (
            
  <div key={index}>
    {item.response && (
      <div className='history_output'>
        <div className='entrance'>
          <b>{localStorage.getItem('username')}:</b> {item.query}
        </div>
        <div className='entrance'>
          <b>Sidekik:</b> {item.response}
          <button onClick={() => sendToCart(item.response, localStorage.getItem('username'))}>Like</button>
        </div><br /><br />
      </div>
    )}
  </div>
))}


</div>



           
            <h1 className="html-spinner"></h1>
            <h1 className="html-spinner1"></h1>
            
            <form onSubmit={insert_db} className='data-input'>
              <input type="text1" value={info} onChange={handleSearchChange2} placeholder="insert" />
              <button type='submit1'>Insert data</button>
            </form>
            <div className='foundchat' style={{fontSize:'150%',color:"white"}}> 
                Found Chat:
            </div>
            <div style={{color:"white"}}>
              <div className="chatborder">
                {output.split('/n').map((line, index) => {
                  let highlightedText = '';
                  let remainingText = line.replace(/(woman|man|גבר|בחורה)/g, '<br><br>$1');
                  while (remainingText.includes('<b>') && remainingText.includes('</b>')) {
                    const startIndex = remainingText.indexOf('<b>');
                    const endIndex = remainingText.indexOf('</b>') + '</b>'.length;
                    const highlightedPart = remainingText.substring(startIndex, endIndex);
                    const beforeHighlight = remainingText.substring(0, startIndex);
                    highlightedText += beforeHighlight + '<span style="font-weight:bold">' + highlightedPart.substring('<b>'.length, highlightedPart.length - '</b>'.length) + '</span>';
                    remainingText = remainingText.substring(endIndex);
                    // console.log(output,'hhhhh');
                    
                  }
                  highlightedText += remainingText;
                  
                  return <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
                    
                    <button onClick={() => sendToCart(output, localStorage.getItem('username'))}>Like</button>
                    
                  </div>
                })}
              </div>
            </div>
            <form onSubmit={phrase_extraction} className='search-input'>
              <input type="text" value={searchText} onChange={handleSearchChange} placeholder="paste message..." />
              <button type='submit' ref={pageRef} >Submit</button>
              <button type="button" onClick={submitNewQuestion}>Community</button>
            </form>
            <div>
      <button onClick={handleShow}>Show {newAnswerCount > 0 && `(${newAnswerCount} new)`}</button>
      {showAnswers && returnedanswer.map((item, index) => (
        <div key={index}>
          {item.users_answer}
          <button onClick={() => sendToCart(item.users_answer, localStorage.getItem('username'))}>Like</button>
        </div>
      ))}
    </div>

            <div className="search-container">
              <div className="cart-container">
                <h2>Favorites</h2>
                <table className="cart-table">
                  <tbody>
                  {/* {item.user}
                  {item.chat.chat}{item.chat.id} */}
                    {cart.map(item => (
                      <tr key={item.id} className="cart-table-row">
                        <td className="cart-table-cell">{item.chat.chat} <button onClick={() => handleDelete(item.chat.id)}>Delete</button></td>
                        {/* <td className="cart-table-cell">{item.chat.id}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            

            <div className="search-container">
              
              <div className="cart-container2 cart-left">
              <div>
              <button onClick={handleClick}>New Chat</button>
              <p className='entrance' style={{ color: 'white' }}>You are now at chat number {localStorage.getItem('newroomId')}.</p>

    <div>
      {chatHistory.map((message, index) => (
        <p key={index}>{message}</p> // Adjust based on the structure of your message
      ))}
    </div>
    </div>
                <h2 style={{ color: 'white' }}>Chat Rooms</h2>
                <table className="cart-table2">
                  <tbody>
                   
                  {uniqueChatRooms.map((roomId, index) => (
                    
    <tr key={index} className="cart-table-row2">
      
        <td className="cart-table-cell2"></td>
        <td className="cart-table-cell2">
          
            <button onClick={() => fetchChatHistory(roomId)} >{roomId}</button>
            {/* {console.log(roomId,'thisssID')} */}
            <button onClick={() => deleteChatRoom(roomId)}>Delete</button>
        </td>
    </tr>
))}

                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      ):null }
 
<form onSubmit={handleSubmitAnswers} className='question_form'>
  {questions.length > 0 ? questions.map((q, index) => {
    if (q.users_question && !answeredQuestions.includes(q.users_question_id)) {
      return (
        <div key={q.users_question_id}>
         {console.log(q.users_question,'q.users_question2')}
          <div className='header3'>Question: {q.users_question}</div>
          <input
            type="text"
            value={answers[q.users_question_id] || ''}
            onChange={handleAnswerChange(q.users_question_id)}
          />
        </div>
      )
    } else {
      return null;
    }
  }) : <div></div>}
  {questions.some(q => q.users_question && !answeredQuestions.includes(q.users_question_id)) && 
  <button type="submit">Submit Answers</button>}
</form>


      {/* <form onSubmit={submitNewQuestion}>
        <input
         type="hidden"
          placeholder="Write a new question"
          value={searchText}
          onChange={handleNewQuestionChange}
        />
        <button type="submit">Submit Question</button>
      </form> */}


    </div>
  );
}

export default Search;
