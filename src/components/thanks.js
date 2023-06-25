import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { formData } from './Upgrade';

function Thanks() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const statusCode = searchParams.get('statusCode');

  useEffect(() => {
    if (statusCode === '0') {
      console.log('guyking')
    }
  }, [statusCode]);

  return (
    <div className="phrases-row">
      <nav>
        <ul>
          <li>
            <a href="http://localhost:3000/home">Home</a>
          </li>
          <li>
            <a href="http://localhost:3000/login">Login</a>
          </li>
        </ul>
      </nav>

      <div className="heading2">
        <div className="App">{statusCode}</div>
        <br></br>
        <div>THANK YOUUUUUUUUUUUUUU</div>
      </div>
    </div>
  );
}

export default Thanks;
