import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes ,Route, NavLink, Router } from 'react-router-dom';
// import Home from './components/Search';
import Chat from './components/ChatPay';
// import WrappedChat from './components/Chatapp';
import PhrasesRow from './components/Openers';
import Search from './components/Search';
import HomePage from './components/Homepage';
import LoginPage from './components/Login';
import SignupPage from './components/Upgrade';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import Navbarstyle from './components/Navbar';
import { Navbar } from 'react-bootstrap';
import Chatpayment from './components/ChatPay';
import Thanks from './components/thanks';
import SignupFree from './components/SignupFree';
import UpgradePage from './components/Upgrade';
import Cart from './components/Cart';
import ChatBox from './components/box';





function App() {



  const [cart,setCart]=useState([])
  
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('session') === 'logged-in');
  
   // this function logs the user in
   const [session, setSession] = useState(localStorage.getItem('session'))
  
   function login(user, pass) {
    console.log(user, pass)
    axios.post('http://localhost:8000/login/', {
        username: user,
        password: pass,
    })
        .then(response => {
            console.log(response.data);
            setSession('logged-in')
            localStorage.setItem('session', 'logged-in')
            localStorage.setItem('username',user)
        })
        .catch(error => {
            console.log(error);
            let status = error.message
               switch (error.code) {case "ERR_BAD_REQUEST":
               status = "username or password not correct plese try again"
               break
           case "ERR_NETWORK":
               status = "could not reach the server. check if the server is down!"
               break
           case "ERR_BAD_RESPONSE":
               status = "server is up. but had an error. you can try again in a fews seconds"
               break
           default:
               break
       }
       alert("something went wrong: " + status)


        });
}
// document.cookie = "username=John Doe; max-age=86400"; // 86400 seconds = 1 day
window.onbeforeunload = function() {
  localStorage.removeItem('key');
};

function logout() {
  axios.get("http://localhost:8000/logout/")
  setSession(null)
  localStorage.removeItem('session')
  localStorage.removeItem('username')
}

            
  return (
  
    
    
<BrowserRouter>

{/* <Navbar logout={logout}></Navbar> */}
    <div className="App">
    
      <Fragment>
    <Routes>
    <Route path='/home' element={<HomePage logout={logout}></HomePage>}></Route>
    <Route path='/thankyoupage' element={<Thanks logout={logout}></Thanks>}></Route>
    <Route path='/upgrade' element={<UpgradePage></UpgradePage>}></Route>
    <Route path='/signup' element={<SignupFree></SignupFree>}></Route>
    <Route path='/cart' element={<Cart cart={cart}setCart={setCart} ></Cart>}></Route>
    <Route path='/login' element={<LoginPage login={login} logout={logout}></LoginPage>}></Route>
    <Route path='/box' element={<ChatBox></ChatBox>}></Route>

    <Route exact path='/supersearch' element={<PrivateRoute/>}>
            <Route exact path='/supersearch' element={<Search logout={logout}/>}/>
          </Route>
          <Route exact path='/chatpayment' element={<PrivateRoute/>}>
            <Route exact path='/chatpayment' element={<Chatpayment logout={logout}/>}/>
          </Route>
          <Route exact path='/openers' element={<PrivateRoute/>}>
            <Route exact path='/openers' element={<PhrasesRow logout={logout}/>}/>
          </Route>
        
    </Routes>
    </Fragment>
  
    </div>
    
    </BrowserRouter>
 
  );
}


export default App;
