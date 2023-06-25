import React, { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { NavLink } from 'react-router-dom';
import { Button } from "react-bootstrap";
import axios from 'axios';



const Chatpayment = ({logout}) => {
    const handlechatSubmit = (e) => {
        e.preventDefault();
        const payment_check=(axios.post('http://localhost:8000/payment_request/'))
        payment_check.then(response => {
            if (response.data === 'guy') {
             
                // const payment=(axios.post('http://localhost:8000/payment/'))
                // payment.then(response => {
                //     if (response.data === 'Paid') {
    const formData=0
        axios.post('http://localhost:8000/register/', formData)
          .then((response) => {
            console.log(response);
            alert('Success')
            window.location.replace('/login');
            // TODO: redirect to a success page
          })}})
          .catch((error) => {
            console.log(error.response);
            alert('Failed')
          });
      };

  return (
    <div>
    <div className="heading">Chat with human rep
    </div>
    <div>Get real time advice</div>
    <div>Only 1.90 usd</div>

    <Button>pay here{handlechatSubmit}</Button> 
    </div>
    
)};


export default Chatpayment;
