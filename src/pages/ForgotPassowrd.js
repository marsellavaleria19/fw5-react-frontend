/* eslint-disable react/no-unescaped-entities */
import React, { useState,useEffect } from 'react';
import Footer from '../component/Footer';
import {FaChevronLeft} from 'react-icons/fa';
import { forgotPasswordProcess } from '../redux/actions/forgotPassword';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ForgotPassowrd = ()=> {

   const dispatch = useDispatch();
   const [success,setSuccess] = useState(false);
   const navigate = useNavigate();

   useEffect(()=>{
      if(success){
         navigate('/confirmforgotpassword');
      }
   },[success]);

   const goToBack = ()=>{
      window.history.back();
   };

    
   const forgotPasswordHandle = (event)=>{
      event.preventDefault();
      var email = event.target.elements['email'].value;
      dispatch(forgotPasswordProcess(email));
      setSuccess(true);        
   };

   return (
      <>
         <header className="header-forgot">
            <div className="header-content">
               <div className="header-nav">
                  <div onClick={goToBack}>
                     <FaChevronLeft/>
                     <span>Back</span>
                  </div>
               </div>
               <h1 className="heading">Don't worry, we got your back!</h1>
               <form onSubmit={forgotPasswordHandle}>
                  <div>
                     <input type="email" name="email" placeholder="Enter your email address" />
                  </div>
                  <div>
                     <button type="submit" className="button-send">Send link</button>
                  </div>
               </form>
               <p className="text">
                    You will receive a link to reset your password. <br/>If you haven't received any link, click <a>Resend Link</a>
               </p>
            </div>
         </header>
         <Footer/>
      </>
   );
};

export default ForgotPassowrd;
