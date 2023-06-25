import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useEffect } from 'react';




function Cartlist({cart,setCart}) {
    
    console.log(cart,"cartttttttttttttttttttttttttttttttttttt");

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/app/cart/')
        .then((response)=> setCart((response.data) ? response.data:[]))
      },[])
    

   


  return (
        
    <div>
          <Card style={{ width: '18rem' }}>
            <div>
        
        </div>
        <Card.Body>
            
            <Card.Text>
           
            </Card.Text>
            {/* <Button variant="danger" onClick ={()=>Deletefromcart(product.product.id)}>Delete</Button> */}
            {/* <Button variant="success" onClick ={()=>updatecart(product.product.id,quantity,product.id)}>Update</Button><br></br> */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    
            </div>
            
        </Card.Body>
        </Card>
            
    </div>
  )
}

export default Cartlist