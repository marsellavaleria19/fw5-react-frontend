/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import NavbarHome from '../component/NavbarHome';
import Footer from '../component/Footer';
import {FaPencilAlt} from 'react-icons/fa';
import Button from '../component/Button';
import Input from '../component/Input';
import Image from '../component/Image';
import {useDispatch, useSelector,connect } from 'react-redux';
import photoImg from '../assets/images/image-photo.png';
import photoImgDetail from '../assets/images/image-photo.png';
import { profileProcess } from '../redux/actions/profile';
import { validation } from '../helpers/validation';
import ModalLoading from '../component/ModalLoading';
import ModalNotifError from '../component/ModalNotifError';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import ModalConfitmation from '../component/ModalConfirmation';
import Select from '../component/Select';
import {FaChevronDown,FaChevronLeft} from 'react-icons/fa';
import { updateVehicle,deleteVehicle } from '../redux/actions/vehicle';
import { useNavigate } from 'react-router-dom';
import LayoutProfile from '../component/LayoutProfile';
import { addCategory,getListCategory } from '../redux/actions/category';
import { addLocation,getListLocation } from '../redux/actions/location';
import ModalInput from '../component/ModalInput';
import {ImCross} from 'react-icons/im';

export const EditVehicle = ()=> {
   const {auth,category,location,vehicle} = useSelector(state=>state);
   const [file,setFile] = useState(null);
   const [image,setImage] = useState(null);
   var [inputVehicle,setInputVehicle] = useState({
      name:'',
      category: '',
      location: '',
      price: 0,
      stock: 0,
      description : '',
      'is available' : ''
   });
   const [error,setError] = useState({});
   const [show, setShow] = useState(false);
   const handleShow = ()=>setShow(true);
   const handleClose = () => setShow(false);
   const [control,setControl] = useState(false);
   const navigate = useNavigate();
   const [showModalError,setShowModalError] = useState(false);
   const [showModalSuccess,setShowModalSuccess] = useState(false);
   const [showModalLoading,setShowModalLoading] = useState(false);
   const [showModalInputLocation,setShowModalInputLocation] = useState(false);
   const [showModalInputCategory,setShowModalInputCategory] = useState(false);
   var [messageError,setMessageError] = useState('');
   var [messageSuccess,setMessageSuccess] = useState('');
   const handleCloseModalLocation= ()=> setShowModalInputLocation(false);
   const handleCloseModalCategory= ()=> setShowModalInputCategory(false);
   const handleCloseLoading = () => setShowModalLoading(false);
   const handleCloseError = () => setShowModalError(false);
   const handleCloseSuccess = () => setShowModalSuccess(false);
   const [showDeletePhoto,setShowDeletePhoto] = useState(false);
 
   const dispatch = useDispatch();
   
   useEffect(()=>{
      if(vehicle.dataVehicle!==null){
         setImage(vehicle.dataVehicle.photo==null ? photoImg : vehicle.dataVehicle.photo);
         const{category_id,isAvailable,location_id,name,photo,price,qty} = vehicle.dataVehicle;
         inputVehicle = {
            name:name,
            category: category_id,
            location: location_id,
            price: price,
            stock: qty,
            description : vehicle.dataVehicle.description,
            'is available' : isAvailable
         };
         if(vehicle.dataVehicle.photo!==null){
            setShowDeletePhoto(true);
         }
         setInputVehicle(inputVehicle);
         setControl(false);
         setError({});
      }
   },[]);

   const cancelHandle = ()=>{
      window.history.back();
   };

   //handle  show success modal
   useEffect(()=>{
      setShowModalLoading(vehicle.isLoading);
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
            inputVehicle.location  = location.dataLocation.id;
            setInputVehicle(inputVehicle);
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
            setShowModalError(true);
         }else{
            dispatch(getListCategory());
            messageSuccess = category.message;
            setMessageSuccess(messageSuccess);
            setShowModalSuccess(true);
            inputVehicle.category = category.dataCategory.id;
            setInputVehicle(inputVehicle);
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

   useEffect(()=>{
      if(vehicle.dataVehicle!==null){
         setImage(vehicle.dataVehicle.photo==null ? photoImg : vehicle.dataVehicle.photo);
         const{category_id,isAvailable,location_id,name,photo,price,qty} = vehicle.dataVehicle;
         inputVehicle = {
            name:name,
            category: category_id,
            location: location_id,
            price: price,
            stock: qty,
            description : vehicle.dataVehicle.description,
            'is available' : isAvailable
         };
         setInputVehicle(inputVehicle);
         setControl(false);
         setError({});
         // console.log(control);
      }     
   },[vehicle.dataVehicle]);

   const goToVehicle = ()=>{
      navigate(`/category/${inputVehicle.category}`);
   };

   const updateVehicleHandle = (event)=>{
      event.preventDefault();
      inputVehicle.price = inputVehicle.price.toString();
      inputVehicle.stock = inputVehicle.stock.toString();
      inputVehicle.location = inputVehicle.location.toString();
      inputVehicle.category = inputVehicle.category.toString();
      inputVehicle['is available'] = inputVehicle['is available'].toString();
      // console.log(inputVehicle);
      var requirement = {
         name:'required',
         category : 'choose',
         location: 'choose',
         price: 'required|number|grather0',
         stock: 'required|number|grather0',
         description : 'required',
         'is available' : 'choose'
      };
      var validate = validation(inputVehicle,requirement);
      if(file!==null){
         if(file.size > 2000000){
            validate = {...validate,...{image:'size of image max 2MB'}};
         }
      }
      console.log(inputVehicle);
      if(Object.keys(validate).length == 0){
         dispatch(updateVehicle(inputVehicle,vehicle.dataVehicle.id,auth.token,file));
         setControl(true);
      }else{
         setError(validate);
      }
   };

   const deleteVehicleHandle = (event)=>{
      event.preventDefault();
      dispatch((deleteVehicle(vehicle.dataVehicle.id,auth.token)));
      setControl(true);
      setShow(false);
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
      inputVehicle.stock = parseInt(inputVehicle.stock)+1;
      setInputVehicle({...inputVehicle});
   };

   const decrementQty = (e)=> {
      e.preventDefault();
      if(parseInt(inputVehicle.stock) >0){
         inputVehicle.stock = parseInt(inputVehicle.stock)-1;
         setInputVehicle({...inputVehicle});
      }
    
   };

   const handleChange = (event)=>{
      event.preventDefault();
      let value = event.target.value;
      let nameOfInput = event.target.name;
      console.log(nameOfInput);
      console.log(value);
      setInputVehicle({...inputVehicle,[nameOfInput]:value});
      if(nameOfInput=='location' && value==0){
         setShowModalInputLocation(true);
      }

      if(nameOfInput=='category' && value==0){
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

   // const deletePhotoHandle = (e)=> {
   //    e.preventDefault();
   //    setFile(null);
   //    setImage(photoImg);
   //    setShowDeletePhoto(false);
   // };

   return (
      <LayoutProfile>
         <ModalLoading show={showModalLoading} close={handleCloseLoading}/>
         {
            messageError!=='' && <ModalNotifError message={messageError} show={showModalError} close={handleCloseError}/> 
         }
         {
            messageSuccess!=='' && <ModalNotifSuccess message={messageSuccess} show={showModalSuccess} close={handleCloseSuccess} button="Go to detail list vehicle" functionHandle={goToVehicle}/>
         }
         <div className='container'>
            <div className="header-nav">
               <div className='row'>
                  <div className='col-md col-log-6'>
                     <div>
                        <FaChevronLeft/>
                        <span>Edit item</span>
                     </div>
                  </div>
                  <div className='col-md-3 col-lg-6 text-end'>
                     <div>
                        <Button btnVarian={'button-dark button-delete-item'} type="button" onClick={handleShow}>Delete</Button>
                     </div>
                  </div>
                  <ModalConfitmation title={'Delete'} show={show} message={'Do you really want to delete this data? This data cannot restore.'} functionHandle={deleteVehicleHandle} close={handleClose} button={'Delete'}/>
               </div>
            </div>
            <form onSubmit={updateVehicleHandle} encType='multipart/form-data'>
               <div className='row mt-5'>
                  <div className='col-md'>
                     <div className="mb-4">
                        <Input variantInput="d-block w-100 input-line" typeInput="text" name="name" placeholder="Name (max up to 50 words)" onChange={handleChange} value={inputVehicle.name}/>
                        {error!==null && error.name ? <div className="error">{error.name}</div> : '' }
                     </div>
                     <div className="d-inline-block img-vehicle position-relative">
                        <Image photo={image} photoVarian='img-fluid img-vehicle w-100' alt="Popular1" onClick={(e)=>chooseFiles(e)}/>
                        <input id="fileUpload" type="file" name="photo" hidden onChange={selectedFile}/> 
                        {/* {showDeletePhoto==true &&
                           <div className="button-delete-photo" onClick={deletePhotoHandle}>
                              <ImCross/>
                           </div>} */}
                     </div>
                     {/* <div className='position-relative'>
                        <Image photo={image} photoVarian={'img-vehicle'} onClick={(e)=>chooseFiles(e)}/>
                        <input id="fileUpload" type="file" name="photo" hidden onChange={selectedFile}/> 
                     </div> */}
                  </div>
                  <div className='col-md'>
                     <div className="mb-4">
                        <label className='label-form-line' htmlFor="location">Location</label>
                        <div className='select-form d-flex position-relative align-items-center'>
                           <Select name="location" value={inputVehicle.location} onChange={handleChange}>
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
                        <textarea name="description" className="w-100 textarea-line" placeholder="Description (max up to 150 words)" onChange={handleChange} value={inputVehicle.description}/>
                        {error!==null && error.description ? <div className="error">{error.description}</div> : '' }
                     </div>
                     <div className="mb-4">
                        <label className='label-form-line' htmlFor="price">Price</label>
                        <Input variantInput="d-block w-100 input-no-line" typeInput="number" name="price" placeholder="Price" onChange={handleChange} value={inputVehicle.price}/>
                        {error!==null && error.price ? <div className="error">{error.price}</div> : '' }
                     </div>
                     <div className="mb-4">
                        <label className='label-form-line' htmlFor="location">Status</label>
                        <div className='select-form d-flex position-relative align-items-center'>
                           <Select name="is available" value={inputVehicle['is available']} onChange={handleChange}>
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
                              <Input typeInput="number" name="stock" value={inputVehicle.stock} onChange={handleChange}/>
                              <Button btnVarian="minus" onClick={(e)=>decrementQty(e)}>-</Button>
                           </div>
                        </div>
                       
                     </div>
                  </div>
               </div>
               <div className="mt-3 mb-5 row">
                  <div className="col-md-5 mb-3">
                     <div className='select-form-item d-flex position-relative align-items-center'>
                        <Select name="category" value={inputVehicle.category} onChange={handleChange}>
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
                     <Button btnVarian="button-save-item w-100 fs-4 fw-bold" type="submit">Save Change</Button>
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

const mapStateToProps = state => ({vehicle:state.vehicle});
export default connect(mapStateToProps)(EditVehicle);
