import React, { Component, useState } from 'react';
// import logo from './moon-1527501_1920.jpg'
import axios from 'axios';
import { useEffect} from 'react';
import { NavLink } from 'react-router-dom';

const PhrasesRow = ({logout}) => {
  const [searchText, setSearchText] = useState('');
  const [info, infoSearchText] = useState('');
  const [output, setOutput] = useState('');
  const [output1, setOutput2] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (output) {
      // console.log("output1", output);
    }
  }, [output]);

  useEffect(() => {
    if (output1) {
      // console.log("output", output);
    }
  }, [output1]);

  function insert_db(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    axios.post('http://localhost:8000/app/insert_db_openers/', {
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
    
  const fetchCartData = () => {
    const username = localStorage.getItem('username');
    axios.get(`http://127.0.0.1:8000/app/cart_openers/?user=${username}`)
      .then(response => {
        console.log(response.data,'response.data');
        setCart(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchCartData();
  }, []);

  const sendToCart = (output, username) => {
    const data = {
      chat: output,
      user_name: username
    };
  
    axios
      .post('http://127.0.0.1:8000/app/cart_openers/', data)
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
  
const username = localStorage.getItem('username');
const handleDelete = (itemId) => {
  axios
    .delete(`http://127.0.0.1:8000/app/deletecart_openers/${itemId}/${username}`) // Assuming the API endpoint for deleting an item from the cart is "/app/cart/:id/"
    .then(response => {
      // Handle success response
      console.log('Item deleted:', itemId);
    
      const updatedCart = cart.filter(item => item.id !== itemId);
      setCart(updatedCart);
    })
    .catch(error => {
      // Handle error
      console.error('Error deleting item:', error);
    });
};

  function phrase_extraction(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    axios.post('http://localhost:8000/app/searchopeners/', {
      customer_input: searchText,
    })
      .then(response => {
       
        console.log("Rendering Search component");
        if (response.data.length > 0) {
            setOutput(response.data);
          } else {
            setOutput("No matching phrases found.");
          }
        })
      .catch(error => {
        console.log(error);
      });
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  }
  console.log("Rendering Search component");
  return (
    <div className='func_entrance'>
   
        <nav>
          <ul>
          {localStorage.getItem('username') ? (
  <>
    {/* <li><a href="http://localhost:3000/home">Home</a></li> */}
    {/* <li><a href="http://localhost:3000/supersearch">Super Search</a></li> */}
    {/* <li><a href="http://localhost:3000/openers/">Openers</a></li> */}
    {/* <li><a href="http://localhost:3000/chatpayment/">Chat</a></li> */}
    <NavLink to="/home" className="me-auto" onClick={() => { logout(); window.location.reload(); }}>Logout</NavLink>

    <div className='me-auto3'>
      <span className='me-auto3__text'>Logged in as: {localStorage.getItem('username')}</span>
    </div>
  </>
) : (
  <>
    <li>
                    <a href="http://localhost:3000/login/">Login</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/signup/">Signup</a>
                  </li>
                  <li>
                    <a href="http://localhost:3000/upgrade/">Upgrade</a>
                  </li>
    {/* <li><a href="http://localhost:3000/chatpayment/">Chat</a></li> */}
  </>
)}

            
          </ul>
        </nav>
      
     
    <div style={{
      
    //   backgroundImage: `url(${logo})`,
      backgroundSize: "cover",
      position: 'relative',
      width: '100%',
      minHeight: "90vh"
    }}>
      

      <div className="search-container">
              <div className="cart-container">
                <h2>Favorites</h2>
                <table className="cart-table">
                  <tbody>
                  {/* {item.user}
                  {item.chat.chat}{item.chat.id} */}
                    {cart.map(item => (
                      <tr key={item.id} className="cart-table-row">
                        {console.log(item.id,'item.id')}
                        {console.log(item.opener.id,'item.opener.id')}
                        <td className="cart-table-cell">{item.opener} <button onClick={() => handleDelete(item.id)}>Delete</button></td>
                        {/* <td className="cart-table-cell">{item.chat.id}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>



      <h1 className="heading" style={{color:"white"}}>openers</h1>
      <h1 className="heading2" style={{color:"white"}}></h1>
      <h1 className="html-spinner"></h1>
      <h1 className="html-spinner1"></h1>
      {/* <h1 className="heading1">Space Market</h1> */}
     
      <div>
        <div className='subtitle' style={{color:"white"}}></div>
        <form onSubmit={phrase_extraction} className='search-input'>
          {/* <input type="text" value={searchText} onChange={handleSearchChange} placeholder="paste message..." /> */}
          <button type='submit'>Generate</button>
        </form>
        <form onSubmit={insert_db} className='data-input'>
          <input type="text1" value={info} onChange={handleSearchChange2} placeholder="insert" />
          <button type='submit1'>Insert data</button>
        </form>
        <div className='foundchat' style={{fontSize:'200%',color:"white"}}> 
            Found Chat:
        </div>

        </div>



        {/* ### *the new code start from here/ } 
{/* this code was at the beggining with out the bold part. and it was short: <div style={{color:"white"}}><div className="chatborder">{output.split('\n').map((line, index) => <div key={index}>{line}</div>)}</div></div> */}
       <div style={{color:"white"}}>
  <div className="chatborder_openers">
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
      }
      
      highlightedText += remainingText;
      
      return (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: highlightedText }}></div>
          <button onClick={() => sendToCart(highlightedText,localStorage.getItem('username'))}>Like</button>
        </div>
      )
    })}
  </div>
</div>

{/* ### */}
{/* and finishes here */}


      <div style={{fontSize:'200%',color:"white"}}>
      
      </div>
    </div>
    
    </div>
    
  );
};
export default PhrasesRow;
