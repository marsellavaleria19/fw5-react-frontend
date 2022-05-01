/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import logoGoogle from '../assets/images/logo-google.png';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import Input from '../component/Input';
import Button from '../component/Button';
import { registrationProcess } from '../redux/actions/registration';
import { useDispatch, useSelector } from 'react-redux';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import ModalNotifError from '../component/ModalNotifError';

export const Signup = () => {

   const {auth} = useSelector(state=>state);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   var [messageError,setMessageError] = useState('');
   var [messageSuccess,setMessageSuccess] = useState('');
   const [error,setError] = useState({}); 
   const [control,setControl] = useState(false);
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
 

   const goToLogin = ()=>{
      navigate('/login');
   };

  
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


   const signupHandle = (event)=>{
      event.preventDefault();
      var name = event.target.elements['name'].value;
      var username =  event.target.elements['username'].value;
      var email = event.target.elements['email'].value;
      var password =  event.target.elements['password'].value;
      var mobileNumber = event.target.elements['mobileNumber'].value;

      const data = {
         name,username,email,password,'mobile number':mobileNumber
      };
      
      const requirement = {
         name : 'required',
         username : 'required',
         email : 'required|email',
         password : 'required',
         'mobile number' : 'required|phone'
      };

      var validate = validation(data,requirement);
      if(Object.keys(validate).length == 0){
         dispatch(registrationProcess(data));
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
            messageSuccess!=='' && <ModalNotifSuccess message={messageSuccess} show={showModalSuccess} close={handleCloseSuccess} button="Go to login" functionHandle={goToLogin}/>
         }
         <header className="header-login-signup">
            <div className="header-content">
               <div className="container">
                  <div className="row">
                     <div className="header-title col">
                        <h1 className="heading">Let's Explore<br/>The World</h1>
                        <p className="text">Don't have account?</p>
                        <button className="button-dark" onClick={goToLogin}>Login</button>
                     </div>
                     <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column mb-5">
                        <div className="separator-circle"></div>
                        <div className="separator-line"></div>
                        <div className="separator-circle"></div>
                     </div>
                     <div className="header-signup col-lg">
                        <form onSubmit={signupHandle} className="form-login-signup">
                           <div>
                              <Input type="text" name="name" placeholder="Name" />
                           </div>
                           {error!==null && error.name ? <div className="error">{error.name}</div> : '' }
                           <div>
                              <Input type="text" name="username" placeholder="Username" />
                           </div>
                           {error!==null && error.username ? <div className="error">{error.username}</div> : '' }
                           <div>
                              <Input type="text" name="email" placeholder="Email" />
                           </div>
                           {error!==null && error.email ? <div className="error">{error.email}</div> : '' }
                           <div>
                              <Input type="text" name="mobileNumber" placeholder="Mobile phone" />
                           </div>
                           {error!==null && error['mobile number'] ? <div className="error">{error['mobile number']}</div> : '' }
                           <div>
                              <Input type="password" name="password" placeholder="Password" />
                           </div>
                           {error!==null && error.password ? <div className="error">{error.password}</div> : '' }
                           <div>
                              <Button btnVarian="button-filled mt-4">Sign Up</Button>
                           </div>
                           <div>
                              <Button btnVarian="button-google mt-4 mb-5"><img src={logoGoogle} alt="Logo"/>Sign Up With Google</Button>
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
