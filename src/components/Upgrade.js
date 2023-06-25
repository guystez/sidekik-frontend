import React, { useState } from 'react';
import axios from 'axios';
// import Thanks, {status} from './thanks';




const UpgradePage = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    
  });


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    const payment_check=(axios.post('http://localhost:8000/payment_request/'))
    payment_check.then(async (response) => {
      console.log(response.data);
    
      
      //const obj = JSON.parse(response.data);
      let uniqId=response.data['uniqId'];
      //if sucess(0):
      if (response.data['responseCode'] === 0 ) {
          
          console.log('here')

          var iframe = document.createElement('iframe');

            // Set the source URL for the iframe
            iframe.src = 'https://api.takbull.co.il/PaymentGateway?orderUniqId='+uniqId

            // Set any additional attributes for the iframe
            iframe.width = '500';
            iframe.height = '300';
            var container = document.getElementById('iframeContainer');
            container.appendChild(iframe);
      }   
            
    })}


  return (
    
    
    
             
            
          <div>
      <section  >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="signup-form">
                <form onSubmit={handleSubmit}>
                  <div>
                 For premium plan you get:
                 </div> <br></br>
                 <div className='regulartxt'>
                 <div>
                 unlimited use of all features:
                 </div><br></br>
                 <div>
                 -super search
                 <div>
                 -openers
                 </div>
                 <div>
                 -
                 </div>
                 <div>
                 -
                 </div> <br></br>
                 </div>
                 <div>
                add to 'cart':
                </div> <br></br>
                <div>
                 save favorite openres, converstaion and last searches that you made
                 </div>
                 </div>

                  <div id='iframeContainer'>
      </div>
                    <div className="form-outline mb-4">
                     
                    
                        
                     
                       
                   
                    </div>
                    for only 9.00 $ /month
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                      Get premium now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export let formData
export default UpgradePage;