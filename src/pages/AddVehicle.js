/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import NavbarHome from '../component/NavbarHome';
import Footer from '../component/Footer';
import {FaPencilAlt} from 'react-icons/fa';
import Button from '../component/Button';
import Input from '../component/Input';
import Image from '../component/Image';
import {useDispatch, useSelector } from 'react-redux';
import photoImg from '../assets/images/image-photo.png';
import { profileProcess } from '../redux/actions/profile';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import Select from '../component/Select';
import {FaChevronDown} from 'react-icons/fa';
import { addVehicle } from '../redux/actions/vehicle';

export const AddVehicle = ()=> {
   const {auth,category,location,vehicle} = useSelector(state=>state);
   const [file,setFile] = useState(null);
   const [image,setImage] = useState(null);
   var [inputVehicle,setInputVehicle] = useState({
      name:'',
      category: '',
      location: '',
      price: 0,
      stock: 0,
      description : ''
   });
   const [error,setError] = useState({});
   const [control,setControl] = useState(false);
 
   const dispatch = useDispatch();
   
   useEffect(()=>{
      setImage(photoImg);
      dispatch({
         type:'CLEAR_VEHICLE'
      });
   },[]);

   const cancelHandle = ()=>{
      window.history.back();
   };

   useEffect(()=>{
      if(vehicle.isError==true){
         dispatch({
            type:'VEHICLE_MESSAGE_ERROR'
         });
         window.scrollTo(0,0);
      }
   },[vehicle.isError]);

   useEffect(()=>{
      if(vehicle.isSuccess==true){
         dispatch({
            type:'VEHICLE_MESSAGE_SUCCESS'
         });
         window.scrollTo(0,0);
      }
   },[vehicle.isSuccess]);

   const handleUpdateProfile = (event)=>{
      event.preventDefault();
      inputVehicle.price = inputVehicle.price.toString();
      inputVehicle.stock = inputVehicle.stock.toString();
      var requirement = {
         name:'required',
         category : 'choose',
         location: 'choose',
         price: 'required|number|grather0',
         stock: 'required|number|grather0',
         description : 'required'
      };
      inputVehicle.isAvailable = '0';
      var validate = validation(inputVehicle,requirement);
      if(file!==null){
         if(file.size > 2000000){
            validate = {...validate,...{image:'size of image max 2MB'}};
         }
      }
    
      if(Object.keys(validate).length == 0){
         dispatch(addVehicle(inputVehicle,auth.token,file));
         setControl(true);
         setInputVehicle({
            name:'',
            category: '',
            location: '',
            price: 0,
            stock: 0,
            description : ''
         });
      }else{
         setError(validate);
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
      setInputVehicle({...inputVehicle,[nameOfInput]:value});
   };

   return (
      <>
         <NavbarHome/>
         <ModalLoading isLoading={vehicle.isLoading}/>
         <ModalNotifError message={vehicle.errMessage} showModal={vehicle.isError}/> 
         <ModalNotifSuccess message={vehicle.message} showModal={vehicle.isSuccess}/>
         <form onSubmit={handleUpdateProfile} encType='multipart/form-data'>
            <section className="profile container">
               <h1 className="title">Form Vehicle</h1>
               <div className="text-center">
                  <div className="d-inline-block position-relative">
                     <Image photo={image} photoVarian="profile rounded-circle" alt="profile"/>
                     <input id="fileUpload" type="file" name="photo" hidden onChange={selectedFile}/>   
                     <Button btnVarian="position-absolute button-edit-profile rounded-circle" onClick={(e)=>chooseFiles(e)}><FaPencilAlt/></Button>
                  </div>
                  {error!==null && error.image ? <div className="error">{error.image}</div> : '' }
               </div>
            </section>
            <section className="profile-form container">
               <div className="container">
                  <div className="mb-5">
                     <label htmlFor="name">Name</label>
                     <Input variantInput="d-block w-100" typeInput="text" name="name" onChange={handleChange} value={inputVehicle.name}/>
                     {error!==null && error.name ? <div className="error">{error.name}</div> : '' }
                  </div>
                  <div className="mb-5">
                     <div className="row">
                        <div className="col-sm">
                           <label htmlFor="price">Price</label>
                           <Input name="price" variantInput="d-block w-100" typeInput="number" onChange={handleChange} value={inputVehicle.price}/>
                           {error!==null && error.price ? <div className="error">{error.price}</div> : '' }
                        </div>
                        <div className="col-sm">
                           <label htmlFor="qty">Stock</label>
                           <Input name="stock" variantInput="d-block w-100" typeInput="number" onChange={handleChange} value={inputVehicle.stock}/>
                           {error!==null && error.stock ? <div className="error">{error.stock}</div> : '' }
                        </div>
                     </div>
                  </div>
                  <div className="mb-5">
                     <label htmlFor="description">Description</label>
                     <textarea name="description" className="d-block w-100" onChange={handleChange} value={inputVehicle.description}></textarea>
                     {error!==null && error.description ? <div className="error">{error.description}</div> : '' }
                  </div>
                  <div className="mb-5">
                     <div className="row">
                        <div className="col-sm">
                           <label htmlFor="location">Location</label>
                           <div className='select-form d-flex position-relative align-items-center'>
                              <Select name="location" onChange={handleChange}>
                                 <option value="" style={{display:'none'}}>Select Location</option>
                                 {
                                    location.listLocation.length > 0 && location.listLocation.map((item)=>{
                                       return(
                                          <option key={item.id} value={item.id}>{item.location}</option>
                                       );
                                    })
                                 }
                              </Select>
                              <FaChevronDown/>
                           </div>
                           
                           {error!==null && error.location ? <div className="error">{error.location}</div> : '' }
                        </div>
                        <div className="col-sm">
                           <label htmlFor="category">Category</label>
                           <div className='select-form d-flex position-relative align-items-center'>
                              <Select name="category" onChange={handleChange}>
                                 <option value="" style={{display:'none'}}>Select Category</option>
                                 {
                                    category.listCategory.length > 0 && category.listCategory.map((item)=>{
                                       return(
                                          <option key={item.id} value={item.id}>{item.name}</option>
                                       );
                                    })
                                 }
                              </Select>
                              <FaChevronDown/>
                           </div>
                          
                           {error!==null && error.category ? <div className="error">{error.category}</div> : '' }
                        </div>
                     </div>
                  </div>
                  <div className="mt-5 row">
                     <div className="col-md-4 mb-3">
                        <Button type="submit" btnVarian="button-filled">Save Product</Button>
                     </div>
                     <div className="col-md-4 mb-3">
                        <Button btnVarian="button-gray" type="button" onClick={cancelHandle}>Cancel</Button>
                     </div>
                  </div>
               </div>
            </section>
         </form>

         <Footer/>
      </>
   );
};

export default AddVehicle;
