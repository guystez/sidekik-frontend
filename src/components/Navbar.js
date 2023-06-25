
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Navbarstyle({logout}) {

    return (

        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand >Infinity Space Market</Navbar.Brand>
              <Nav className="me-auto">
                <NavLink to="/" className="me-auto">Home</NavLink ><br></br>
                <NavLink to="/supersearch" className="me-auto">searcg</NavLink><br></br>
                <NavLink to="/openers" className="me-auto">openers</NavLink><br></br>
                {/* <NavLink to="/404page" className="me-auto">404 page</NavLink> */}
                <div className='me-auto3'>
               <span className='me-auto3__text'>{localStorage.getItem('username')}</span>
               </div>
                <NavLink to="/login" className="me-auto">Login</NavLink><br></br>
                <NavLink to="/" className="me-auto" onClick={logout}>Logout</NavLink><br></br>
                
              </Nav>
            </Container>
          </Navbar>
         
        </>
      );
    }

export default Navbarstyle;
