/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import NavbarHome from '../component/NavbarHome';
import Footer from '../component/Footer';
import Button from '../component/Button';
import Input from '../component/Input';
import { verifyEmailProcess } from '../redux/actions/registration';
import {useDispatch, useSelector } from 'react-redux';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import { useNavigate } from 'react-router-dom';
import LayoutProfile from '../component/LayoutProfile';

export const VerifyEmail = ()=> {
   const {auth} = useSelector(state=>state);
   const [error,setError] = useState({});
   const [control,setControl] = useState(false);
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(()=>{
      if(auth.user!==null){
         setControl(false);
         setError({});
      }
   },[]);
  
   //handle  show success modal
   useEffect(()=>{
      setShowModalLoading(auth.isLoading);
      if(auth.isLoading==false && control==true){
         if(auth.isError){
            setShowModalError(true);
         }else{
            setShowModalSuccess(true);
         }
         setControl(false);
      }
   },[auth.isLoading]);

   const goToHomePage = (event)=>{
      event.preventDefault();
      navigate('/');
   };

   const goToConfirmationEmail = ()=>{
      navigate('/confirm-verify-email');
   };

   const verifyEmailHandle = (event)=>{
      event.preventDefault();
      const email =  event.target.elements['email'].value;
      var data = {
         email:email,
      };

      var requirement = {
         email:'required|email',
      };
 
      var validate = validation(data,requirement);
      if(Object.keys(validate).length==0){
         dispatch(verifyEmailProcess(data));
         setControl(true);
      }else{
         setError(validate);
      }
   };
 
   return (
      <LayoutProfile>
         <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
         <ModalNotifError message={auth.errMessage} show={showModalError} close={handleCloseError}/> 
         <ModalNotifSuccess message={auth.message} show={showModalSuccess} close={handleCloseSuccess} button="Confirmation Email" functionHandle={goToConfirmationEmail}/>
         <section className='profile container'>
            <h1 className="title">Verify Email</h1>
            <form onSubmit={verifyEmailHandle} encType='multipart/form-data'>
               <div className="profile-form container">
                  <div className="container">
                     <div className="mb-5">
                        <label htmlFor="email">Email</label>
                        <Input variantInput="d-block w-100" typeInput="text" name="email" value={auth.user.email}/>
                        {error!==null && error.email ? <div className="error">{error.email}</div> : '' }
                     </div>
                     <div className="mt-5 row mb-5 justify-content-center">
                        <div className="col-md-4">
                           <Button type="submit" btnVarian="button-filled">Send Code</Button>
                        </div>
                        <div className="col-md-4">
                           <Button btnVarian="button-gray" onClick={goToHomePage}>Cancel</Button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </section>
      </LayoutProfile>
   );
};

export default VerifyEmail;
