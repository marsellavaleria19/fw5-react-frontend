import React, { useEffect, useState } from 'react';
import NavbarHome from '../component/NavbarHome';
import Footer from '../component/Footer';
import Button from '../component/Button';
import Input from '../component/Input';
import { changePasswordProcess } from '../redux/actions/auth';
import {useDispatch, useSelector } from 'react-redux';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import { useNavigate } from 'react-router-dom';

export const ChangePassword = ()=> {
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

   //handle show success modal after close
   useEffect(()=>{
      if(showModalSuccess==false || showModalError==false){
         window.scrollTo(0,0);
      }
   },[showModalSuccess,showModalError]);

   const goToHomePage = (event)=>{
      event.preventDefault();
      navigate('/');
   };

   const changePasswordHandle = (event)=>{
      event.preventDefault();
      console.log('masuk!!');
      const password =  event.target.elements['password'].value;
      const newPassword =  event.target.elements['newPassword'].value;
      const confirmNewPassword = event.target.elements['confirmNewPassword'].value;
      var data = {
         password :password,
         'new password' : newPassword,
         'confirm new password' : confirmNewPassword
      };

      var requirement = {
         password:'required',
         'new password':'required',
         'confirm new password': 'required'
      };
 
      var validate = validation(data,requirement);
      if(Object.keys(validate).length==0){
         if(newPassword==confirmNewPassword){
            dispatch(changePasswordProcess(data,auth.token));
            setControl(true);
         }else{
            setShowModalError(true);
            auth.errMessage = 'New password and confirm password not match';

         }
      }else{
         setError(validate);
      }
   };
 
   return (
      <>
         <NavbarHome/>
         <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
         <ModalNotifError message={auth.errMessage} show={showModalError} close={handleCloseError}/> 
         <ModalNotifSuccess message={auth.message} show={showModalSuccess} close={handleCloseSuccess}/>
         <section className='profile container'>
            <h1 className="title">Change Password</h1>
            <form onSubmit={changePasswordHandle} encType='multipart/form-data'>
               <div className="profile-form container">
                  <div className="container">
                     <div className="mb-5">
                        <label htmlFor="password">Password</label>
                        <Input type="password" variantInput="d-block w-100" typeInput="text" name="password"/>
                        {error!==null && error.password ? <div className="error">{error.password}</div> : '' }
                     </div>
                     <div className="mb-5">
                        <label htmlFor="newPassword">New Password</label>
                        <Input typeInput="password" variantInput="d-block w-100" name="newPassword"/>
                        {error!==null && error['new password'] ? <div className="error">{error['new password']}</div> : '' }
                     </div>
                     <div className="mb-5">
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <Input name="confirmNewPassword" variantInput="d-block w-100" typeInput="password"/>
                        {error!==null && error['confirm new password'] ? <div className="error">{error['confirm new password']}</div> : '' }
                     </div>
                     <div className="mt-5 row mb-5 justify-content-center">
                        <div className="col-md-4">
                           <Button type="submit" btnVarian="button-filled">Change Password</Button>
                        </div>
                        <div className="col-md-4">
                           <Button btnVarian="button-gray" onClick={goToHomePage}>Cancel</Button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </section>
         <Footer/>
      </>
   );
};

export default ChangePassword;
