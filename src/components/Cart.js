import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/app/cart/')
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const cardListStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridGap: '0.1rem',
    width: '80%',
  };

  return (
    <div>
      <h1>Cart</h1>
      <div style={cardListStyle}>
        {cart.map(item => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Title>{item.user}</Card.Title>
              <Card.Text>{item.chat}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Cart;
