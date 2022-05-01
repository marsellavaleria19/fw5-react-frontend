/* eslint-disable no-unused-vars */
import React, { Component,useEffect,useState } from 'react';
import imgDetailVehicle from '../assets/images/detail-vehicle.png';
import imgPopular1 from '../assets/images/popular1.png';
import imgPopular2 from '../assets/images/popular2.png';
import imgPopular3 from '../assets/images/popular3.png';
import NavbarHomeSearch from '../component/NavbarHomeSearch';
import Footer from '../component/Footer';
import {FaChevronLeft} from 'react-icons/fa';
import {FaChevronRight} from 'react-icons/fa';
import {FaHeart} from 'react-icons/fa';
import {default as axios} from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../component/Layout';
import { Link,useNavigate } from 'react-router-dom';
import { getDetailVehicle } from '../redux/actions/vehicle';
import { increment,decrement } from '../redux/actions/counter';
import { useSelector,connect } from 'react-redux';
import Button from '../component/Button';
import Input from '../component/Input';
import { useDispatch } from 'react-redux';
import Image from '../component/Image';
import Carousel from 'react-elastic-carousel';
import { getDataVehicle } from '../redux/actions/vehicle';
import photoImage from '../assets/images/image-photo.png';

const  DetailVehicle =  ()=> {

   const {vehicle,counter,auth} = useSelector(state=>state);
   const [qty,setQty] = useState(0);

   const dispatch = useDispatch();

   const [dataVehicle,setDataVehicle] = useState({});

   const [photo,setPhoto] = useState(imgDetailVehicle);
 
   const {id} = useParams();
   console.log(id);
   const navigate = useNavigate();

   useEffect(()=>{
      dispatch(getDetailVehicle(id));
      setPhoto(vehicle.dataVehicle?.photo);
      setDataVehicle(vehicle.dataVehicle);
      if(auth.user?.role=='admin'){
         setQty(vehicle.dataVehicle.qty);
      }else{
         setQty(0);
      }
   },[]);

   useEffect(()=>{
    
      console.log('masuk use effect data vehicle');
      if(vehicle.dataVehicle!==null){
         setDataVehicle(vehicle.dataVehicle);
         setPhoto(vehicle.dataVehicle?.photo);
         if(auth.user?.role=='admin'){
            setQty(vehicle.dataVehicle.qty);
         }else{
           
            setQty(0);
         }
      }
   },[vehicle.dataVehicle]);
    
   // const getDataVehicle = async()=>{
   //     const {data} = await axios.get(`${REACT_APP_URL}/vehicles/${id}`);
   //     setDataVehicle(data.results);
   // }

   const goToReservation = (id)=>{
      navigate(`/reservation/${id}`);
   };

   const goToEditVehicle = ()=>{
      navigate('/vehicle/edit');
   };

   const goToDetail = ()=>{
      window.history.back();
   };
    
   const countIncrement = (event) =>{
      event.preventDefault();
      dispatch(increment());
      setQty(counter.num);
   };


   const countDecrement = (event) =>{
      event.preventDefault();
      dispatch(decrement());
      setQty(counter.num);
   };
   return (
      <Layout>
         <div className="detail-vehicle container mb-5">
            <div onClick={goToDetail} className="header-nav">
               <FaChevronLeft/>
               <span>Detail</span>
            </div>
            <div className='row'>
               <div className='col-md'>
                  <div>
                     <Image photo={photo!==null ? photo : photoImage } photoVarian={'img-vehicle'}/>
                  </div>
                  <div>
                     <Carousel itemsToShow={2}  pagination={false}>
                        <Image photo={photo!==null ? photo : photoImage} photoVarian="img-vehicle-detail me-4" alt="Detail Vehicle" onClick={()=>setPhoto(imgDetailVehicle)}/>
                        <Image photo={photo!==null ? photo : photoImage} photoVarian="img-vehicle-detail me-4" alt="Detail Vehicle" onClick={()=>setPhoto(imgPopular1)}/>
                        <Image photo={photo!==null ? photo : photoImage} photoVarian="img-vehicle-detail me-4" alt="Detail Vehicle" onClick={()=>setPhoto(imgPopular2)}/>
                        <Image photo={photo!==null ? photo : photoImage} photoVarian="img-vehicle-detail" alt="Detail Vehicle" onClick={()=>setPhoto(imgPopular3)}/>
                     </Carousel>
                  </div>
                  {/* <div className="d-flex align-items-center">
                     <div className="col-2">
                        <div className="arrow-button detail-vehicle-icon me-3">
                           <FaChevronLeft/>
                        </div>
                     </div>
                     <div className="col-4">
                        <Image photo={vehicle.listVehicle[0].photo} photoVarian="me-4 img-vehicle-detail" alt="Detail Vehicle"/>
                     </div>
                     <div className="col-4">
                        <Image photo={vehicle.listVehicle[0].photo} photoVarian="img-vehicle-detail" alt="Detail Vehicle"/>
                     </div>
                     <div className="col-2">
                        <div className="arrow-button detail-vehicle-icon ms-3">
                           <FaChevronRight/>
                        </div>
                     </div>
                  </div> */}
               </div>
               <div className='col-md justify-sm-content-center'>
                  <div className="title-vehicle">
                     <h1>{dataVehicle?.name}</h1>
                     <div className="location">{dataVehicle?.location}</div>
                  </div>
                  <div className="status-vehicle">
                     <div className="text-success fw-bold mb-2">{dataVehicle?.isAvailable==1 ? 'Is Available' : 'Full booked'}</div>
                     <div className="no-prepayment">No Prepayment</div>
                  </div>
                  <div className="detail-info">
                     <div className="mb-2">Capacity : 1 person</div>
                     <div className="mb-2">Type:{dataVehicle?.category}</div>
                     <div>Reservation before 2 PM</div>
                  </div>
                  <div className="price">
                     <h1 className="text-end">Rp. {dataVehicle?.price?.toLocaleString('id-ID')}/day</h1>
                  </div>
                  <form>
                     <div className="form-quantity d-flex button-plus-minus">
                        {
                           auth.user?.role=='admin' ?
                              <>
                                 <Button btnVarian="plus" disabled onClick={countIncrement}>+</Button>
                                 <Input typeInput="number" disabled value={qty}/>
                                 <Button btnVarian="minus" disabled onClick={countDecrement}>-</Button>
                              </> :
                              <>
                                 <Button btnVarian="plus" onClick={countIncrement}>+</Button>
                                 <Input typeInput="number" value={qty}/>
                                 <Button btnVarian="minus" onClick={countDecrement}>-</Button>
                              </>
                        }
                        {/* <Button btnVarian="plus" onClick={countIncrement}>+</Button>
                        <Input typeInput="number" value={qty}/>
                        <Button btnVarian="minus" onClick={countDecrement}>-</Button> */}
                     </div>
                  </form>
               </div>
            </div>
            <div className="button-detail">
               {
                  auth.user?.role=='admin' ?
                     <Button btnVarian={'button-save-item fs-4 fw-bold'} onClick={goToEditVehicle}>Edit Item</Button> :
                     <div className="row">
                        <div className="col-lg-5 col-md-4 mb-3">
                           <button className="button-dark btn-chat">Chat Admin</button>
                        </div>
                        <div className="col-lg-5 col-md mb-3">
                           <button onClick={()=>goToReservation(dataVehicle.id)} className="button-filled btn-reservation">Reservation</button>
                        </div>
                        <div className="col-lg-2 col-md-3 mb-3">
                           <button className="button-dark btn-like d-flex justify-content-center align-items-center">
                              <FaHeart/>Like</button>
                        </div>
                     </div>
               }
              
            </div>
            {/* <div className='row'>
                  <div className="col-md">
                     <div className='mt-5'>
                        <div className="d-flex img-vehicle-detail align-items-center">
                           <div className="col-2">
                              <div className="arrow-button me-3">
                                 <FaChevronLeft/>
                              </div>
                           </div>
                           <div className="col-4">
                              <img src={vehicle.listVehicle[0].photo} className="me-4" alt="Detail Vehicle"/>
                           </div>
                           <div className="col-4">
                              <img src={vehicle.listVehicle[0].photo} alt="Detail Vehicle"/>
                           </div>
                           <div className="col-2">
                              <div className="arrow-button ms-3">
                                 <FaChevronRight/>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <div className="img-vehicle">
                           <img src={vehicle.listVehicle[0].photo} alt="detail-vehicle"/>
                        </div>
                     </div>
                  </div>
                  <div className="col-md justify-sm-content-center">
                     <div className="title-vehicle">
                        <h1>{vehicle.listVehicle.name}</h1>
                        <div className="location">{vehicle.listVehicle.location}</div>
                     </div>
                     <div className="status-vehicle">
                        <div className="text-success fw-bold mb-2">Available</div>
                        <div className="no-prepayment">No Prepayment</div>
                     </div>
                     <div className="detail-info">
                        <div className="mb-2">Capacity : 1 person</div>
                        <div className="mb-2">Type:{vehicle.listVehicle.category}</div>
                        <div>Reservation before 2 PM</div>
                     </div>
                     <div className="price">
                        <h1 className="text-end">Rp. {vehicle.listVehicle.price?.toLocaleString('id')}/day</h1>
                     </div>
                     <form>
                        <div className="form-quantity d-flex button-plus-minus">
                           <Button btnVarian="plus" onClick={countIncrement}>+</Button>
                           <Input typeInput="number" value={counter.num}/>
                           <Button btnVarian="minus" onClick={countDecrement}>-</Button>
                        </div>
                     </form>
                  </div>
               </div> */}
            {/* <div className="button-detail">
                        <div className="row">
                           <div className="col-lg-5 col-md-4 mb-3">
                              <button className="button-dark btn-chat">Chat Admin</button>
                           </div>
                           <div className="col-lg-5 col-md mb-3">
                              <button onClick={()=>goToReservation(vehicle.listVehicle.id)} className="button-filled btn-reservation">Reservation</button>
                           </div>
                           <div className="col-lg-2 col-md-3 mb-3">
                              <button className="button-dark btn-like d-flex justify-content-center align-items-center">
                                 <FaHeart/>Like</button>
                           </div>
                        </div>
                     </div> */}
         </div>
      </Layout>
   );
};

export default DetailVehicle;