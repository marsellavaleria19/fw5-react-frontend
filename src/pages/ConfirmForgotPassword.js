import React, { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import {FaChevronLeft} from 'react-icons/fa';
import { confirmForgotPasswordProcess } from '../redux/actions/forgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../component/Button';
import { useNavigate } from 'react-router-dom';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';

export const ConfirmForgotPassowrd = ()=> {

   const {auth} = useSelector(state=>state);
   const dispatch = useDispatch();
   const [control,setControl] = useState(false);
   const [error,setError] = useState({});
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   var [messageError,setMessageError] = useState('');
   var [messageSuccess,setMessageSuccess] = useState('');
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
   const navigate = useNavigate();

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

   const goToBack = ()=>{
      window.history.back();
   };

   const goToLogin = ()=>{
      navigate('/login');
   };

   const confirmForgotPasswordHandle = (event)=>{
      event.preventDefault();
      var email = event.target.elements['email'].value;
      var code = event.target.elements['code'].value;
      var password = event.target.elements['password'].value;
      var confirmPassword = event.target.elements['confirm-password'].value;
      const data = {
         email,code,password,'confirm password' : confirmPassword
      };

      const requirement = {
         email : 'required|email',
         code : 'required',
         password : 'required',
         'confirm password' : 'required'
      };

      const validate = validation(data,requirement);
      if(Object.keys(validate).length == 0){
         if(data.password!==data['confirm password']){
            setMessageError('password and confirm password not match');
            setShowModalError(true);
         }else{
            dispatch(confirmForgotPasswordProcess(data));        
         }
         setControl(true);
      }else{
         setError(validate);
      }
     
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
               <div className="container">
                  <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
                  {
                     messageError!=='' && <ModalNotifError message={messageError} show={showModalError} close={handleCloseError}/> 
                  }
                  {
                     messageSuccess!=='' && <ModalNotifSuccess message={messageSuccess} show={showModalSuccess} close={handleCloseSuccess} button="Go to login" functionHandle={goToLogin}/>
                  }
                  <form onSubmit={confirmForgotPasswordHandle} className='mt-5'>  
                     <div className='mb-3'>
                        <input type="text" name="email" placeholder="Email" />
                        {error!==null && error.email ? <div className="error">{error.email}</div> : '' }
                     </div>       
                     <div className='mb-3'>
                        <input type="text" name="code" placeholder="Code" />
                        {error!==null && error.code ? <div className="error">{error.code}</div> : '' }
                     </div>
                     <div className='mb-3'>
                        <input type="password" name="password" placeholder="Password" />
                        {error!==null && error.password ? <div className="error">{error.password}</div> : '' }
                     </div>
                     <div className='mb-3'>
                        <input type="password" name="confirm-password" placeholder="Confirm Password" />
                        {error!==null && error['confirm password'] ? <div className="error">{error['confirm password']}</div> : '' }
                     </div>
                     <div>
                        <Button type="submit" className="button-send">Submit</Button>
                     </div>
                  </form>
               </div>
            </div>
         </header>
         <Footer/>
      </>
   );
};

export default ConfirmForgotPassowrd;
