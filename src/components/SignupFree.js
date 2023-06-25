import React, { useState } from 'react';
import axios from 'axios';
// import Thanks, {status} from './thanks';




const SignupFree = () => {
  
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

  const handleSubmit =  (e) => {
    e.preventDefault();
       axios.post('http://localhost:8000/register/', formData)
          .then((response) => {
            console.log(response);
            alert('Success');
            window.location.replace('/login');
            // TODO: redirect to a success page
          })
          .catch((error) => {
            console.log(error.response);
            alert('Failed');
          });
     
        }



  return (
    
    
    
             
            
          <div>
            
      <section  >
        <div className='heading2'> 
    Sign up now for free and give it a try!!
    </div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="signup-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input type="text" className="form-control form-control-lg" name="username" value={formData.username} onChange={handleInputChange} placeholder="Enter Username" />
                    <label className="form-label" >
                      Username:
                    </label>
                  </div>
                  <div id='iframeContainer'>
      </div>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        //   id="typePasswordX-2"
                        className="form-control form-control-lg"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email} onChange={handleInputChange}
                      />
                      <label className="form-label" >
                        Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        //   id="typePasswordX-2"
                        className="form-control form-control-lg"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password} onChange={handleInputChange}
                      />
                      <label className="form-label" >
                        Password
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        //   id="typePasswordX-2"
                        className="form-control form-control-lg"
                        name="confirm_password"
                        placeholder="confirm password"
                        value={formData.confirm_password} onChange={handleInputChange}
                      />
                      <label className="form-label" >
                        confirm password
                      </label>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                      Register
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
export default SignupFree;