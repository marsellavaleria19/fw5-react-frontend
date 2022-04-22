import React, { useEffect, useState } from 'react';
import NavbarHome from '../component/NavbarHome';
import Footer from '../component/Footer';
import {FaPencilAlt} from 'react-icons/fa';
import Button from '../component/Button';
import Input from '../component/Input';
import Image from '../component/Image';
import { useDispatch, useSelector } from 'react-redux';
import profileImg from '../assets/images/profile.png';
import moment from 'moment';
import { profileProcess } from '../redux/actions/profile';
import { getDataUser } from '../redux/actions/auth';

export const Profile = ()=> {
   const {auth,profile} = useSelector(state=>state);
   const [file,setFile] = useState(null);
   const [image,setImage] = useState(null);
   const [inputProfile,setInputProfile] = useState({
      email:'',
      address: '',
      gender: '',
      mobileNumber: '',
      nickName: '',
      birthDate: ''
   });
   const [success,setSuccess] = useState(false);
 

   const dispatch = useDispatch();

   useEffect(()=>{
      if(auth.user!==null){
         setImage(auth.user.photo==null ? profileImg : auth.user.photo);
         const{email,address,gender,mobileNumber,NickName:nickName,birthDate} = auth.user;
         var birthDateFormat = moment(birthDate).format('YYYY-MM-DD');
         setInputProfile({email,address,gender,mobileNumber,nickName,birthDate:birthDateFormat});
         setSuccess(false);
      }
   },[]);

   useEffect(()=>{
      if(profile.dataProfile!==null && success){
         var token = window.localStorage.getItem('token');
         const{email,address,gender,mobileNumber,NickName:nickName,birthDate} = profile.dataProfile;
         var birthDateFormat = moment(birthDate).format('YYYY-MM-DD');
         setInputProfile({email,address,gender,mobileNumber,nickName,birthDate:birthDateFormat});
         dispatch(getDataUser(token));
         dispatch({
            type : 'CLEAR_PROFILE'
         });
      }
   },[profile.dataProfile]);

   const handleUpdateProfile = (event)=>{
      event.preventDefault();
      var token = window.localStorage.getItem('token');
      dispatch(profileProcess(auth.user.id,inputProfile,file,token));
      setSuccess(true);
   };

   const selectedFile = (e)=>{
      e.preventDefault();
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
   };

   const chooseFiles = ()=> {
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
         <form onSubmit={handleUpdateProfile} encType='multipart/form-data'>
            <section className="profile container">
               {
                  profile.success == true && 
                <div className="alert alert-success" role="alert">
                   {profile.message}
                </div>
               }
               <h1 className="title">Profile</h1>
               <div className="text-center">
                  <div className="d-inline-block position-relative">
                     <Image photo={image} photoVarian="profile rounded-circle" alt="profile"/>
                     <input id="fileUpload" type="file" name="photo" hidden onChange={selectedFile}/>   
                     <Button btnVarian="position-absolute button-edit-profile rounded-circle" onClick={chooseFiles}><FaPencilAlt/></Button>
                  </div>
                  <div className="profile-detail">
                     <h1 className="name">{auth.user!==null && auth.user.fullName}</h1>
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
               </div>
            </section>
            <section className="profile-form container">
               <h5>Contact</h5>
               <div className="container">
                  <div className="mb-5">
                     <label htmlFor="email">Email</label>
                     <Input variantInput="d-block w-100" typeInput="text" name="email" onChange={handleChange} value={inputProfile.email}/>
                  </div>
                  <div className="mb-5">
                     <label htmlFor="address">Address</label>
                     <textarea name="address" className="d-block w-100" onChange={handleChange} value={inputProfile.address}></textarea>
                  </div>
                  <div className="mb-5">
                     <label htmlFor="mobileNumber">Mobile number</label>
                     <Input name="mobileNumber" variantInput="d-block w-100" typeInput="text" onChange={handleChange} value={inputProfile.mobileNumber}/>
                  </div>
                  <div className="mb-5">
                     <h5>Identity</h5>
                     <div className="row">
                        <div className="col-sm">
                           <label htmlFor="nickname">Display name</label>
                           <Input name="nickName" variantInput="d-block w-100" typeInput="text" onChange={handleChange} value={inputProfile.nickName}/>
                        </div>
                        <div className="col-sm">
                           <label htmlFor="birth-date">Birth date (MM/DD/YY)</label>
                           <Input name="birthDate" variantInput="d-block w-100" typeInput="date" onChange={handleChange} value={inputProfile.birthDate}/>
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
