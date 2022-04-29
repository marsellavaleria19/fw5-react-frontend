/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import NavbarHome from '../component/NavbarHome';
import Footer from '../component/Footer';
import Button from '../component/Button';
import { confirmVerifyProcess } from '../redux/actions/registration';
import {useDispatch, useSelector } from 'react-redux';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import { useNavigate } from 'react-router-dom';
import PinInput from 'react-pin-input';
import LayoutProfile from '../component/LayoutProfile';

export const ConfirmVerifyEmail = ()=> {
   const {auth} = useSelector(state=>state);
   const [error,setError] = useState({});
   const [control,setControl] = useState(false);
   const [code,setCode] = useState('');
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
      if(showModalSuccess==false && auth.user.isVerified==1){
         goToHomePage();
      }
   },[showModalSuccess]);

   const goToHomePage = ()=>{
      navigate('/');
   };

   const confirmVerifyEmailHandle = (event)=>{
      event.preventDefault();

      console.log('masuk!!');
      
      var data = {
         code:code,
      };

      var requirement = {
         code:'required',
      };
 
      var validate = validation(data,requirement);
      if(Object.keys(validate).length==0){
         data.email  = auth.user.email;
         data.password = auth.user.password;
         dispatch(confirmVerifyProcess(data));
         setControl(true);
      }else{
         setShowModalError(true);
         auth.errMessage = validate.code;
      }
   };
 
   return (
      <LayoutProfile>
         <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
         <ModalNotifError message={auth.errMessage} show={showModalError} close={handleCloseError}/> 
         <ModalNotifSuccess message={auth.message} show={showModalSuccess} close={handleCloseSuccess}/>
         <section className='profile container'>
            <h1 className="title">Verify Email</h1>
            <form onSubmit={confirmVerifyEmailHandle} encType='multipart/form-data'>
               <div className="profile-form container">
                  <div className="container">
                     <div className="mb-5">
                        <label htmlFor="email">Code</label>
                        <div className='text-center mt-3'>
                           <PinInput 
                              length={6} 
                              initialValue=""
                              secret 
                              onChange={(value) => setCode(value)} 
                              type="numeric" 
                              inputMode="number"
                              inputStyle={{borderColor: '#30475E',width:'100px',height:'100px',justifyContent:'center',marginBottom:'10px'}}
                              inputFocusStyle={{borderColor: '#30475E'}}
                              onComplete={(value) => setCode(value)}
                              autoSelect={true}
                           />
                        </div>
                     </div>
                     <div className="mt-5 row mb-5 justify-content-center">
                        <div className="col-md-4 mb-3">
                           <Button type="submit" btnVarian="button-filled">Submit</Button>
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

export default ConfirmVerifyEmail;
