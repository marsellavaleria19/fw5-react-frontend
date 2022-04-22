import React, { useEffect } from 'react';
import {FaChevronLeft} from 'react-icons/fa';
import {FaChevronRight} from 'react-icons/fa';
import {FaHeart} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Layout from '../component/Layout';
import { useNavigate } from 'react-router-dom';
import { getDetailVehicle } from '../redux/actions/vehicle';
import { increment,decrement } from '../redux/actions/counter';
import { useSelector } from 'react-redux';
import Button from '../component/Button';
import Input from '../component/Input';
import { useDispatch } from 'react-redux';

export const  DetailVehicle =  ()=> {

   const {vehicle,counter} = useSelector(state=>state);

   const dispatch = useDispatch();

   const {id} = useParams();
   const navigate = useNavigate();

   useEffect(()=>{
      dispatch(getDetailVehicle(id));
   },[]);
    
   // const getDataVehicle = async()=>{
   //     const {data} = await axios.get(`${REACT_APP_URL}/vehicles/${id}`);
   //     setDataVehicle(data.results);
   // }

   const goToReservation = (id)=>{
      navigate(`/reservation/${id}`);
   };

   const goToDetail = ()=>{
      window.history.back();
   };
    
   const countIncrement = (event) =>{
      event.preventDefault();
      dispatch(increment());
   };


   const countDecrement = (event) =>{
      event.preventDefault();
      dispatch(decrement());
   };
   return (
      <Layout>
         {
            Object.keys(vehicle.listVehicle) ? 
               <section className="detail-vehicle container mb-5">
                  <div onClick={goToDetail} className="header-nav">
                     <FaChevronLeft/>
                     <span>Detail</span>
                  </div>
                  <div className="row container">
                     <div className="col-md">
                        <div className="img-vehicle">
                           <img src={vehicle.listVehicle.photo} alt="detail-vehicle"/>
                        </div>
                        <div className="row-md">
                           <div className="row img-vehicle-detail align-items-center">
                              <div className="col-2">
                                 <div className="arrow-button me-3">
                                    <FaChevronLeft/>
                                 </div>
                              </div>
                              <div className="col-4">
                                 <img src={vehicle.listVehicle.photo} className="me-4" alt="Detail Vehicle"/>
                              </div>
                              <div className="col-4">
                                 <img src={vehicle.listVehicle.photo} alt="Detail Vehicle"/>
                              </div>
                              <div className="col-2">
                                 <div className="arrow-button ms-3">
                                    <FaChevronRight/>
                                 </div>
                              </div>
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
                  </div>
                  <div className="button-detail">
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
                  </div>
               </section> : 
               <div className="no-vehicle text-center">
                    There is no vehicle left
               </div> 
         }
      </Layout>
   );
};

export default DetailVehicle;
