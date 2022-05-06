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
import photoImgDetail from '../assets/images/image-photo.png';
import { profileProcess } from '../redux/actions/profile';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import Select from '../component/Select';
import {FaChevronDown,FaChevronLeft} from 'react-icons/fa';
import { addVehicle } from '../redux/actions/vehicle';
import { addLocation,getListLocation } from '../redux/actions/location';
import LayoutProfile from '../component/LayoutProfile';
import ModalInput from '../component/ModalInput';
import { addCategory,getListCategory } from '../redux/actions/category';

export const AddVehicle = ()=> {
   const {auth,category,location,vehicle} = useSelector(state=>state);
   const [file,setFile] = useState(null);
   const [image,setImage] = useState(null);
   const [error,setError] = useState({});
   const [control,setControl] = useState(false);
   var [stock,setStock] = useState(0);
   const [dataLocation,setDataLocation] = useState(null);
   const [dataCategory,setDataCategory] = useState(null);
   var [messageError,setMessageError] = useState('');
   var [messageSuccess,setMessageSuccess] = useState('');
   const [showModalInputLocation,setShowModalInputLocation] = useState(false);
   const [showModalInputCategory,setShowModalInputCategory] = useState(false);
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   const handleCloseModalLocation= ()=> setShowModalInputLocation(false);
   const handleCloseModalCategory= ()=> setShowModalInputCategory(false);
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
 
   const dispatch = useDispatch();
   
   useEffect(()=>{
      setImage(photoImg);
      setControl(false);
      setError({});
   },[]);

   const cancelHandle = ()=>{
      window.history.back();
   };

   //handle  show success modal
   useEffect(()=>{
      setShowModalLoading(vehicle.isLoading);
      setShowModalInputLocation(false);
      setShowModalInputCategory(false);
      if(vehicle.isLoading==false && control==true){
         if(vehicle.isError){
            messageError = vehicle.errMessage;
            setMessageError(messageError);
            setShowModalError(true);
         }else{
            messageSuccess = vehicle.message;
            setMessageSuccess(messageSuccess);
            setShowModalSuccess(true);
         }
         setControl(false);
      }
   },[vehicle.isLoading]);

   useEffect(()=>{
      setShowModalLoading(location.isLoading);
      setShowModalInputLocation(false);
      if(location.isLoading==false && control==true){
         if(location.isError){
            messageError = location.errMessage;
            setMessageError(messageError);
            setShowModalError(true);
         }else{
            dispatch(getListLocation());
            messageSuccess = location.message;
            setMessageSuccess(messageSuccess);
            setShowModalSuccess(true);
            setDataLocation(location.dataLocation.id);
         }
         setControl(false);
      }
   },[location.isLoading]);

   useEffect(()=>{

      setShowModalLoading(category.isLoading);
      setShowModalInputCategory(false);
      if(category.isLoading==false && control==true){
         if(category.isError){
            messageError = category.errMessage;
            setMessageError(messageError);
         }else{
            dispatch(getListCategory());
            messageSuccess = category.message;
            setMessageSuccess(messageSuccess);
            console.log(messageSuccess);
            setShowModalSuccess(true);
            setDataCategory(category.dataCategory.id);
         }
         setControl(false);
      }
   },[category.isLoading]);

   //handle show success modal after close
   useEffect(()=>{
      if(showModalSuccess==false || showModalError==false){
         window.scrollTo(0,0);
      }
   },[showModalSuccess,showModalError]);


   const addVehicleHandle = (event)=>{
      event.preventDefault();
      const filled = ['name','category','location','price','stock','description','is available'];
      const data = {};
      filled.forEach((item)=>{
         data[item] = event.target.elements[item].value;
      });
      data.stock = data.stock.toString();
      console.log(data);
      var requirement = {
         name:'required',
         category : 'choose',
         location: 'choose',
         price: 'required|number|grather0',
         stock: 'required|number|grather0',
         description : 'required',
         'is available' : 'choose'
      };
      var validate = validation(data,requirement);
      if(file!==null){
         if(file.size > 2000000){
            validate = {...validate,...{image:'size of image max 2MB'}};
         }
      }
      if(Object.keys(validate).length == 0){
         dispatch(addVehicle(data,auth.token,file));
         setControl(true);
         document.getElementById('form-vehicle').reset();
         setStock(0);
         setImage(photoImg);
         setFile(null);
         setDataCategory(null);
         setDataLocation(null);
         setError({});
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

   const incrementQty = (e)=> {
      e.preventDefault();
      stock = stock+1;
      setStock(stock);
   };

   const decrementQty = (e)=> {
      e.preventDefault();
      if(stock>0){
         stock = stock-1;
         setStock(stock);
      }
    
   };

   const handleChange = (event)=>{
      event.preventDefault();
      let value = event.target.value;
      setStock(value);
   };

   const handleChangeLocation = (event)=>{
      event.preventDefault();
      if(event.target.value==0){
         setShowModalInputLocation(true);
      }
   };

   const handleChangeCategory = (event)=>{
      event.preventDefault();
      if(event.target.value==0){
         setShowModalInputCategory(true);
      }
   };

   const addLocationHandle = (event)=>{
      event.preventDefault();
      const location = event.target.elements['location'].value;
      const data = {
         location : location
      };

      const requirement = {
         location:'required'
      };

      const validate = validation(data,requirement);
      if(Object.keys(validate).length == 0){
         dispatch(addLocation(auth.token,data));
         setControl(true);
      }else{
         setError(validate);
      }
   };

   const addCategoryHandle = (event)=>{
      event.preventDefault();
      const category = event.target.elements['category'].value;
      const data = {
         category : category
      };

      const requirement = {
         category:'required'
      };

      const validate = validation(data,requirement);
      if(Object.keys(validate).length == 0){
         dispatch(addCategory(auth.token,data));
         setControl(true);
      }else{
         setError(validate);
      }
   };

   return (
      <LayoutProfile>
         <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
         {
            messageError!=='' && <ModalNotifError message={messageError} show={showModalError} close={handleCloseError}/> 
         }
         {
            messageSuccess!=='' && <ModalNotifSuccess message={messageSuccess} show={showModalSuccess} close={handleCloseSuccess}/>
         }
         <div className='container'>
            <div className="header-nav">
               <FaChevronLeft/>
               <span>Add new item</span>
            </div>
            <form id="form-vehicle" onSubmit={addVehicleHandle} encType='multipart/form-data'>
               <div className='row mt-5'>
                  <div className='col-md'>
                     <div className="mb-4">
                        <Input variantInput="d-block w-100 input-line" typeInput="text" name="name" placeholder="Name (max up to 50 words)"/>
                        {error!==null && error.name ? <div className="error">{error.name}</div> : '' }
                     </div>
                     <div>
                        <Image photo={image} photoVarian={'img-vehicle'} onClick={(e)=>chooseFiles(e)}/>
                        <input id="fileUpload" type="file" name="photo" hidden onChange={selectedFile}/>  
                     </div>
                    
                  </div>
                  <div className='col-md'>
                     <div className="mb-4">
                        <label className='label-form-line' htmlFor="location">Location</label>
                        <div className='select-form d-flex position-relative align-items-center'>
                           <Select name="location" value={dataLocation} onChange={handleChangeLocation}>
                              <option value="" style={{display:'none'}}>Select Location</option>
                              {
                                 location.listLocation.length > 0 && location.listLocation.map((item)=>{
                                    return(
                                       <option key={item.id} value={item.id}>{item.location}</option>
                                    );
                                 })
                              }
                              <option value={0}>+ Add Location</option>
                           </Select>
                           <FaChevronDown/>
                          
                        </div>
                        {error!==null && error.location ? <div className="error">{error.location}</div> : '' }
                     </div>
                     <div className="mb-4">
                        <textarea name="description" className="w-100 textarea-line" placeholder="Description (max up to 150 words)"></textarea>
                        {error!==null && error.description ? <div className="error">{error.description}</div> : '' }
                     </div>
                     <div className="mb-4">
                        <label className='label-form-line' htmlFor="price">Price</label>
                        <Input variantInput="d-block w-100 input-no-line" typeInput="number" name="price" placeholder="Price"/>
                        {error!==null && error.price ? <div className="error">{error.price}</div> : '' }
                     </div>
                     <div className="mb-4">
                        <label className='label-form-line' htmlFor="isAvailable">Status</label>
                        <div className='select-form d-flex position-relative align-items-center'>
                           <Select name="is available">
                              <option value="" style={{display:'none'}}>Select Status</option>
                              <option value={1}>Available</option>
                              <option value={0}>Full Booked</option>
                           </Select>
                           <FaChevronDown/>
                        </div>
                        {error!==null && error['is available'] ? <div className="error">{error['is available']}</div> : '' }
                     </div>
                     <div className='mb-4'>
                        <div className='d-flex justify-content-between align-item-center'>
                           <label className='label-form-line' htmlFor="stock">Stock</label>
                           <div className="form-quantity-item d-flex button-plus-minus">
                              <Button btnVarian="plus" onClick={(e)=>incrementQty(e)}>+</Button>
                              <Input typeInput="number" name="stock" value={stock} onChange={handleChange}/>
                              <Button btnVarian="minus" onClick={(e)=>decrementQty(e)}>-</Button>
                           </div>
                        </div>
                       
                     </div>
                  </div>
               </div>
               <div className="mt-3 mb-5 row">
                  <div className="col-md-5 mb-3">
                     <div className='select-form-item d-flex position-relative align-items-center'>
                        <Select name="category" value={dataCategory} onChange={handleChangeCategory}>
                           <option value="" style={{display:'none'}}>Add item to</option>
                           {
                              category.listCategory.length > 0 && category.listCategory.map((item)=>{
                                 return(
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                 );
                              })
                           }
                           <option value={0}>+ Add Category</option>
                        </Select>
                        <FaChevronDown/>
                     </div>
                     {error!==null && error.category ? <div className="error">{error.category}</div> : '' }
                  </div>
                  <div className="col-md">
                     <Button btnVarian="button-save-item w-100 fs-4 fw-bold" type="submit">Save Item</Button>
                  </div>
               </div>
            </form>
            <ModalInput title="Add Location" show={showModalInputLocation} close={handleCloseModalLocation}>
               <form onSubmit={addLocationHandle}>
                  <div className="mb-5 mt-4">
                     <Input variantInput="d-block w-100 input-line" typeInput="text" name="location" placeholder="Location"/>
                     {error!==null && error.location ? <div className="error">{error.location}</div> : '' }
                  </div>
                  <div className='text-end'>
                     <Button btnVarian={'button-delete-item'} onClick={handleCloseModalLocation}>Close</Button>
                     <Button type="submit" btnVarian={'button-filled fw-bold ms-3'}>Save changes</Button>
                  </div>
               </form>
            </ModalInput>
            <ModalInput title="Add Category" show={showModalInputCategory} close={handleCloseModalCategory}>
               <form onSubmit={addCategoryHandle}>
                  <div className="mb-5 mt-4">
                     <Input variantInput="d-block w-100 input-line" typeInput="text" name="category" placeholder="Category"/>
                     {error!==null && error.category ? <div className="error">{error.category}</div> : '' }
                  </div>
                  <div className='text-end'>
                     <Button btnVarian={'button-delete-item'} onClick={handleCloseModalCategory}>Close</Button>
                     <Button type="submit" btnVarian={'button-filled fw-bold ms-3'}>Save changes</Button>
                  </div>
               </form>
            </ModalInput>
            {/* <form onSubmit={handleUpdateProfile} encType='multipart/form-data'>
            <section className="profile container">
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
         </form> */}
         </div>
      </LayoutProfile>
   );
};

export default AddVehicle;
