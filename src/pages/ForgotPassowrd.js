/* eslint-disable react/no-unescaped-entities */
import React, { useState,useEffect } from 'react';
import Footer from '../component/Footer';
import {FaChevronLeft} from 'react-icons/fa';
import { forgotPasswordProcess } from '../redux/actions/forgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';

export const ForgotPassowrd = ()=> {
   const {auth} = useSelector(state=>state);
   const dispatch = useDispatch();
   const [control,setControl] = useState(false);
   const navigate = useNavigate();
   const [error,setError] = useState({});
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   var [messageError,setMessageError] = useState('');
   var [messageSuccess,setMessageSuccess] = useState('');
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
 

 

   useEffect(()=>{
      setShowModalLoading(auth.isLoading);
      if(auth.isLoading==false && control==true){
         if(auth.isError){
            messageError = auth.errMessage;
            setMessageError(messageError);
            setShowModalError(true);
         }else{
            messageSuccess = auth.message;
            setMessageSuccess(messageSuccess);
            setShowModalSuccess(true);
         }
         setControl(false);
      }
   },[auth.isLoading]);

   //handle show success modal after close
   useEffect(()=>{
      if(showModalSuccess==false || showModalError==false){
         window.scrollTo(0,0);
      }
   },[showModalSuccess,showModalError]);

   const goToConfirmForgotPassword = ()=>{
      navigate('/confirmforgotpassword');
   };

   const goToBack = ()=>{
      window.history.back();
   };

   const forgotPasswordHandle = (event)=>{
      event.preventDefault();
      var email = event.target.elements['email'].value;
      const data= {
         email
      };
      const requirement = {
         email : 'required|email'
      };

      const validate = validation(data,requirement);
      if(Object.keys(validate).length == 0){
         dispatch(forgotPasswordProcess(email));
         setControl(true); 
      }else{
         setError(validate);
      }
         
   };

   return (
      <>
         <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
         {
            messageError!=='' && <ModalNotifError message={messageError} show={showModalError} close={handleCloseError}/> 
         }
         {
            messageSuccess!=='' && <ModalNotifSuccess message={messageSuccess} show={showModalSuccess} close={handleCloseSuccess} button="Go to confirm password" functionHandle={goToConfirmForgotPassword}/>
         }
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
                  <div className='mb-5'>
                     <input type="email" name="email" placeholder="Enter your email address" />
                     {error!==null && error.email ? <div className="error">{error.email}</div> : '' }
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
