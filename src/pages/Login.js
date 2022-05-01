/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState } from 'react';
import logoGoogle from '../assets/images/logo-google.png';
import Footer from '../component/Footer';
import {Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Input from '../component/Input';
import { loginProcess } from '../redux/actions/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { validation } from '../helpers/validation';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
// import ModalNotifSuccess from '../component/ModalNotifSuccess';

export const Login = () => {
   
   const {auth} = useSelector(state=>state);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [error,setError] = useState({});
   const [control,setControl] = useState(false);
   

   useEffect(()=>{
      dispatch({
         type:'CLEAR_AUTH'
      });
      setError({});
      setControl(false);
   },[]);

   const goToSignup = ()=>{
      navigate('/signup');
   };

   const loginHandle = (event)=>{
      event.preventDefault();
      var email = event.target.elements['email'].value;
      var password =  event.target.elements['password'].value;
      var data = {
         email,
         password
      };
      var requirment = {
         email : 'required|email',
         password : 'required'
      };
      var validate = validation(data,requirment);
      if(Object.keys(validate).length == 0){
         dispatch(loginProcess(email,password)); 
         setControl(true);
         setError({});
      }else{
         setError(validate);
      }
   };

   return (
      <>
         {
            auth.token!==null &&<Navigate to='/'/>
         }
         <header className="header-login-signup">
            <div className="header-content">
               <div className="container">
                  <div className="row">
                     <div className="header-title col-lg">
                        <h1 className="heading">Let's Explore The World</h1>
                        <p className="text">Don't have account?</p>
                        <Button btnVarian="button-dark" onClick={goToSignup}>Sign Up</Button>
                     </div>
                     <div className="header-separator col-lg d-lg-flex align-items-center flex-lg-column mb-5">
                        <div className="separator-circle"></div>
                        <div className="separator-line"></div>
                        <div className="separator-circle"></div>
                     </div>
                     <div className="header-login col-lg">       
                        <form onSubmit={loginHandle} className="form-login-signup">
                           {
                              auth.isError==true &&
                              <>
                                 <ModalNotifError message={auth.errMessage}/> 
                              </>
                            
                           }
                           <div>
                              <Input typeInput="text" name="email" placeholder="Email"/>
                           </div>
                           {error!==null && error.email ? <div className="error">{error.email}</div> : '' }
                           <div>
                              <Input typeInput="password" name="password" placeholder="Password"/>
                              {error!==null && error.password ? <div className="error">{error.password}</div> : '' }
                              <p><Link to="/forgotpassword">forgot password?</Link></p>
                           </div>
                           <div>
                              <Button type="submit" data-bs-toggle="modal" data-bs-target="#errorModal" btnVarian="button-filled p-4 login">Login</Button>
                           </div>
                           <div>
                              <Button btnVarian="button-google mt-4 mb-5"><img src={logoGoogle} alt="Logo"/>Login With Google</Button>
                           </div>
                           <div className='btn-login-signup'>
                              <p className="text">Don't have account?</p>
                              <Button btnVarian="button-dark" onClick={goToSignup}>Sign Up</Button>
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

export default Login;