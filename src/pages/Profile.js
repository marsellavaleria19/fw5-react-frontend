/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import NavbarHome from '../component/NavbarHome';
import Footer from '../component/Footer';
import {FaPencilAlt} from 'react-icons/fa';
import Button from '../component/Button';
import Input from '../component/Input';
import Image from '../component/Image';
import {useDispatch, useSelector } from 'react-redux';
import profileImg from '../assets/images/profile.png';
import moment from 'moment';
import { profileProcess } from '../redux/actions/profile';
// import { getDataUser } from '../redux/actions/auth';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';

export const Profile = ()=> {
   const {auth} = useSelector(state=>state);
   const [file,setFile] = useState(null);
   const [image,setImage] = useState(null);
   var [inputProfile,setInputProfile] = useState({
      email:'',
      address: '',
      gender: '',
      mobileNumber: '',
      nickName: '',
      birthDate: ''
   });
   const [error,setError] = useState({});
   const [control,setControl] = useState(false);
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
   const dispatch = useDispatch();

   useEffect(()=>{
      if(auth.user!==null){
         setImage(auth.user.photo==null ? profileImg : auth.user.photo);
         const{email,address,gender,mobileNumber,nickName,birthDate} = auth.user;
         var birthDateFormat = '';
         if(birthDate!==null){
            birthDateFormat = moment(birthDate).format('YYYY-MM-DD');
         }

         inputProfile = {
            email : email!==null ? email : '',
            address : address!==null ? address : '',
            gender : gender!==null ? gender : '',
            mobileNumber : mobileNumber!==null ? mobileNumber : '',
            nickName : nickName!==null ? nickName : '',
            birthDate : birthDateFormat
         };
         setInputProfile(inputProfile);
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

   useEffect(()=>{
      if(auth.user!==null){
         setImage(auth.user.photo==null ? profileImg : auth.user.photo);
         const{email,address,gender,mobileNumber,nickName,birthDate} = auth.user;
         var birthDateFormat = '';
         if(birthDate!==null){
            birthDateFormat = moment(birthDate).format('YYYY-MM-DD');
         }

         inputProfile = {
            email : email!==null ? email : '',
            address : address!==null ? address : '',
            gender : gender!==null ? gender : '',
            mobileNumber : mobileNumber!==null ? mobileNumber : '',
            nickName : nickName!==null ? nickName : '',
            birthDate : birthDateFormat
         };
        
         setInputProfile(inputProfile);
         setError({});
         // console.log(control);
      }     
   },[auth.user]);

   const handleUpdateProfile = (event)=>{
      event.preventDefault();
      var requirement = {
         email:'required|email',
         address:'required',
         gender: 'required',
         mobileNumber: 'required|phone',
         nickName: 'required',
         birthDate: 'required|data'
      };
 
      var validate = validation(inputProfile,requirement);

      console.log(file);
      const typeImage = [
         'image/jpeg',
         'image/jpg',
         'image/png',
         'image/gif'
      ];
 
      if(file!==null){
         if(file.size > 2000000){
            validate = {...validate,...{image:'size of image max 2MB'}};
         }else if (!typeImage.includes(file.type)) {
            validate = {...validate,...{image:'Format image must be .jpg/.jpeg/.gif/.png'}};
         }
      }
    
      if(Object.keys(validate).length == 0){
         dispatch(profileProcess(auth.user.id,inputProfile,file,auth.token));
         setControl(true);
      }else{
         setError(validate);
         window.scrollTo(0,0);
      }
   };

   const selectedFile = (e)=>{
      e.preventDefault();
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
   };

   const chooseFiles = (e)=> {
      e.preventDefault();
      document.getElementById('fileUpload').click();
   };

   const handleChange = (event)=>{
      let value = event.target.value;
      let nameOfInput = event.target.name;
      let gender = ['Male','Female'];
      if(gender.indexOf(-1)){
         setInputProfile({...inputProfile,[nameOfInput]:value});
      }else{
         setInputProfile({...inputProfile});
      }
   };

   return (
      <>
         <NavbarHome/>
         <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
         <ModalNotifError message={auth.errMessage} show={showModalError} close={handleCloseError}/> 
         <ModalNotifSuccess message={auth.message} show={showModalSuccess} close={handleCloseSuccess}/>
         <form onSubmit={handleUpdateProfile} encType='multipart/form-data'>
            <section className="profile container">
               <h1 className="title">Profile</h1>
               <div className="text-center">
                  <div className="d-inline-block position-relative">
                     <Image photo={image} photoVarian="profile rounded-circle" alt="profile"/>
                     <input id="fileUpload" type="file" name="photo" hidden onChange={selectedFile}/>   
                     <Button btnVarian="position-absolute button-edit-profile rounded-circle" onClick={(e)=>chooseFiles(e)}><FaPencilAlt/></Button>
                  </div>
                  {error!==null && error.image ? <div className="error">{error.image}</div> : '' }
                  <div className="profile-detail">
                     <h1 className="name">{auth.user!==null && (auth.user.nickName==null ? auth.user.fullName : auth.user.nickName)}</h1>
                     <div className="detail">{auth.user!==null && auth.user.email}</div>
                     <div className="detail">{auth.user!=null && auth.user.mobileNumber}</div>
                     <div className="detail">Has been active since 2013</div>
                  </div>
                  <div className="profile-radio d-flex justify-content-center mb-5">
                     <div className="me-5">
                        <label className="radio-button">
                           <input type="radio" name="gender" checked={inputProfile.gender=='Male' ? true : false} value="Male" onChange={handleChange}/>
                           <div className="checkmark"></div>
                           <div className="text">Male</div>
                        </label>
                     </div>
                     <div>
                        <label className="radio-button">
                           <input type="radio" name="gender" checked={inputProfile.gender=='Female' ? true : false} value="Female" onChange={handleChange}/>
                           <div className="checkmark"></div>
                           <div className="text">Female</div>
                        </label>
                     </div>
                  </div>
                  {error!==null && error.gender ? <div className="error">{error.gender}</div> : '' }
               </div>
            </section>
            <section className="profile-form container">
               <h5>Contact</h5>
               <div className="container">
                  <div className="mb-5">
                     <label htmlFor="email">Email</label>
                     <Input variantInput="d-block w-100" typeInput="text" name="email" onChange={handleChange} value={inputProfile.email}/>
                     {error!==null && error.email ? <div className="error">{error.email}</div> : '' }
                  </div>
                  <div className="mb-5">
                     <label htmlFor="address">Address</label>
                     <textarea name="address" className="d-block w-100" onChange={handleChange} value={inputProfile.address}></textarea>
                     {error!==null && error.address ? <div className="error">{error.address}</div> : '' }
                  </div>
                  <div className="mb-5">
                     <label htmlFor="mobileNumber">Mobile number</label>
                     <Input name="mobileNumber" variantInput="d-block w-100" typeInput="text" onChange={handleChange} value={inputProfile.mobileNumber}/>
                     {error!==null && error.mobileNumber ? <div className="error">{error.mobileNumber}</div> : '' }
                  </div>
                  <div className="mb-5">
                     <h5>Identity</h5>
                     <div className="row">
                        <div className="col-sm">
                           <label htmlFor="nickname">Display name</label>
                           <Input name="nickName" variantInput="d-block w-100" typeInput="text" onChange={handleChange} value={inputProfile.nickName}/>
                           {error!==null && error.nickName ? <div className="error">{error.nickName}</div> : '' }
                        </div>
                        <div className="col-sm">
                           <label htmlFor="birth-date">Birth date (MM/DD/YY)</label>
                           <Input name="birthDate" variantInput="d-block w-100" typeInput="date" onChange={handleChange} value={inputProfile.birthDate}/>
                           {error!==null && error.birthDate ? <div className="error">{error.birthDate}</div> : '' }
                        </div>
                     </div>
                  </div>
                  <div className="mt-5 row">
                     <div className="col-md-4 mb-3">
                        <Button type="submit" btnVarian="button-filled">Save Change</Button>
                     </div>
                     <div className="col-md-4 mb-3">
                        <Button btnVarian="button-dark">Edit Password</Button>
                     </div>
                     <div className="col-md-4 mb-3">
                        <Button btnVarian="button-gray">Cancel</Button>
                     </div>
                  </div>
               </div>
            </section>
         </form>

         <Footer/>
      </>
   );
};

export default Profile;
