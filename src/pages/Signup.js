/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import logoGoogle from '../assets/images/logo-google.png';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import Input from '../component/Input';
import Button from '../component/Button';
import { registrationProcess } from '../redux/actions/registration';
import { useDispatch, useSelector } from 'react-redux';

export const Signup = () => {

   const {auth} = useSelector(state=>state);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [success,setSuccess] = useState(false);
    
   const goToLogin = ()=>{
      navigate('/login');
   };

   useEffect(()=>{
      if(auth.isError){
         dispatch({
            type : 'REGISTER_REJECTED'
         });
      }
   },[auth.isError]);

   useEffect(()=>{
      if(success){
         navigate('/verifyuser');
      }
   },[success]);

   const signupHandle = (event)=>{
      event.preventDefault();
      var name = event.target.elements['name'].value;
      var username =  event.target.elements['username'].value;
      var email = event.target.elements['email'].value;
      var password =  event.target.elements['password'].value;
      dispatch(registrationProcess(name,username,email,password));
      setSuccess(true);        
   };

   return (
      <>
         <header className="header-login-signup">
            <div className="header-content">
               <div className="container">
                  <div className="row">
                     <div className="header-title col">
                        <h1 className="heading">Let's Explore<br/>The World</h1>
                        <p className="text">Don't have account?</p>
                        <button className="button-dark" onClick={goToLogin}>Login</button>
                     </div>
                     <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column">
                        <div className="separator-circle"></div>
                        <div className="separator-line"></div>
                        <div className="separator-circle"></div>
                     </div>
                     <div className="header-signup col-lg">
                        {
                           auth.isError===true &&
                                    <div className="alert alert-danger" role="alert">
                                       {auth.errMesage}
                                    </div>
                        }
                        <form onSubmit={signupHandle} className="form-login-signup">
                           <div>
                              <Input type="text" name="name" placeholder="Name" />
                           </div>
                           <div>
                              <Input type="text" name="username" placeholder="Username" />
                           </div>
                           <div>
                              <Input type="text" name="email" placeholder="Email" />
                           </div>
                           <div>
                              <Input type="password" name="password" placeholder="Password" />
                           </div>
                           <div>
                              <Button btnVarian="button-filled mt-4">Sign Up</Button>
                           </div>
                           <div>
                              <Button btnVarian="button-google mt-4"><img src={logoGoogle} alt="Logo"/>Sign Up With Google</Button>
                           </div>
                           <div className='btn-login-signup'>
                              <p className="text">Have account?</p>
                              <button className="button-dark" onClick={goToLogin}>Login</button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Footer/>
      </>
   );
};

export default Signup;
