// import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import React, { Component, useState } from 'react';
import Search from './Search';
import Openers from './Openers';
import SignupFree from './SignupFree';
import { Button } from 'react-bootstrap';

function HomePage({ logout }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const isLoggedIn = localStorage.getItem('username');

  return (
    
    <div>
      
      {!selectedOption && (
        <header>
          <nav>
            <ul>
              {isLoggedIn ? (
                <>
                  <NavLink to="/home" className="me-auto" onClick={logout}>
                    Logout
                  </NavLink>
                  <div className="me-auto3">
                    <span className="me-auto3__text">
                      Logged in as: {localStorage.getItem('username')}
                    </span>
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
                </>
              )}
            </ul>
          </nav>

          <div className="hero">
            <div className="cool-move">
              <h1>Sidekik</h1>
              <p>Chatting</p>
              <p1>Dating</p1> {/* Changed <p1> to <p> */}
            </div>
            <div className="sub">
              <div>
                <p>The Chat-GPT of dating</p>
              </div>

              {isLoggedIn && (
                <div className="func_entrance">
                { handleOptionSelect('search')}
                  <button onClick={() => handleOptionSelect('openers')}>Openers</button>
                </div>
              )}

              {!isLoggedIn && (
                <>
                  {/* <div className="heading2">
                    First, you need to signup for free or login to start exploring.
                  </div> */}
                  <button>
                    <NavLink to="/login" style={{ textDecoration: 'none' }}>
                      Login
                    </NavLink>
                  </button>
                  <button>
                    <NavLink to="/signup" style={{ textDecoration: 'none' }}>
                      Signup
                    </NavLink>
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
      )}

      {selectedOption === 'search' && <Search logout={logout} />}
      {selectedOption === 'openers' && <Openers logout={logout} />}

      {!selectedOption && ( // Render the rest of the page only if no option is selected
        <main>
          {/* <section className="services">
           
          </section> */}
        </main>
      )}
    </div>
  );
}

export default HomePage;
