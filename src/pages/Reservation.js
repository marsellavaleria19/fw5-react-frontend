/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState,useEffect } from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {FaChevronLeft} from 'react-icons/fa';
import Layout from '../component/Layout';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Image from '../component/Image';
import Button from '../component/Button';
import Input from '../component/Input';
import Select from '../component/Select';
import { increment,decrement } from '../redux/actions/counter';
import { getDetailVehicle } from '../redux/actions/vehicle';
import { saveDataReservation} from '../redux/actions/reservation';
import { connect, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { validation } from '../helpers/validation';
import ModalNotifError from '../component/ModalNotifError';
import ModalLoading from '../component/ModalLoading';
import ModalNotifSuccess from '../component/ModalNotifSuccess';

export const Reservation  = ()=> {

   const {counter,vehicle,reservation,auth} = useSelector(state=>state);
    
   const [day,setDay] = useState(0);

   const [qty,setQty] = useState(0);

   const [error,setError] = useState({});

   const dispatch = useDispatch();

   const {id} = useParams();
   
   const [control,setControl] = useState(false);

   const [showModalSuccess, setShowModalSuccess] = useState(false);
   const handleShowModalSuccess = ()=>setShowModalSuccess(true);
   const handleCloseSuccess = () => setShowModalSuccess(false);

   const navigate = useNavigate();

   useEffect(()=>{
      dispatch({
         type : 'CLEAR_RESERVATION'
      });
      dispatch(getDetailVehicle(id));
      setQty(counter.num);
      console.log(reservation.dataReservation);
   },[]);

   useEffect(()=>{
      if(reservation.dataReservation!==null){
         dispatch({
            type : 'CLEAR_RESERVATION'
         });
      }
   },[reservation.dataReservation]);

   useEffect(()=>{
      if(reservation.dataReservation!==null && control){
         navigate(`/payment/${reservation.dataReservation.id}`);
         dispatch({
            type : 'CLEAR_RESERVATION'
         });
      }
   },[reservation.dataReservation]);

   // const getDataVehicle = async()=>{
   //     const {data} = await axios.get(`http://localhost:5000/vehicles/${id}`);
   //     setDataVehicle(data.results);
   // }

   const goToReservation = ()=>{
      window.history.back();
   };

   const countIncrement = (event) =>{
      event.preventDefault();
      dispatch(increment());
      setQty(counter.num);
   };

   const countDecrement = (event) =>{
      event.preventDefault();
      if(qty > 0){
         dispatch(decrement());
         setQty(counter.num);
      }
   };

   useEffect(()=>{
      if(reservation.isError==true){
         dispatch({
            type:'RESERVATION_MESSAGE_ERROR'
         });
         window.scrollTo(0,0);
      }
   },[reservation.isError]);

   const handleChange = (event) =>{
      let value = event.target.value;
      if(event.target.name=='qty'){
         setQty(value);
      }
        
      if(event.target.name=='day'){
         setDay(value);
      }
   };


   const reservationHandle = (event) => {
      event.preventDefault();
      event.preventDefault();
      var quantity = event.target.elements['qty'].value;
      var date = event.target.elements['date'].value;
      var day = event.target.elements['day'].value;
      var data = {quantity:quantity,date:date,day:day};
   
      const requirement = {
         quantity : 'required|number|grather0',
         date : 'required|date',
         day : 'required'

      };
      const validate = validation(data,requirement);
      if(Object.keys(validate).length == 0){
         const dataSend = {qty:quantity,date:date,day:day,vehicle:vehicle.dataVehicle.id,user:auth.user!==null && auth.user};
         dispatch(saveDataReservation(dataSend,auth.token));
         setControl(true);
      }else{
         setError(validate);
      }

      // if(!reservation.isError){
      // goToPayment(reservation.dataReservation.id)
      // dispatch({
      //                 type : 'CLEAR_RESERVATION'
      // })
      // }
   };

   return (
      <Layout>
         <section className="reservation container mb-5">
            <div onClick={goToReservation} className="header-nav">
               <FaChevronLeft/>
               <span>Reservation</span>
            </div>
            <div className="row">
               <ModalLoading showModal={reservation.isLoading}/>
               <ModalNotifError message={reservation.errMessage} showModal={reservation.isError}/> 
               <div className="col-md">
                  <div>
                     <Image photo={vehicle.dataVehicle.photo} photoVarian={'img-vehicle'} alt="detail-vehicle"/>
                  </div>
               </div>
               <div className="col-md">
                  <div className="title-vehicle">
                     <h1>{vehicle.dataVehicle.name}</h1>
                     <div className="location">{vehicle.dataVehicle.location}</div>
                  </div>
                  <div className="status-vehicle">
                     <div className="no-prepayment fw-bold">No Prepayment</div>
                  </div>

                  <form onSubmit={reservationHandle}>
                     <div className="form-quantity d-flex button-plus-minus">
                        <Button btnVarian="plus" onClick={countIncrement}>+</Button>
                        <Input id="qty" typeInput="number" name="qty" value={qty} onChange={handleChange}/>
                        <Button className="minus" onClick={countDecrement}>-</Button>
                     </div>
                     {error!==null && error.quantity ? <div className="error">{error.quantity}</div> : '' }
                     <h5>Reservation Date</h5>
                     <div className="mb-3">
                        <Input typeInput="date" name="date" variantInput="input-add" placeholder="date"/>
                        {error!==null && error.date ? <div className="error">{error.date}</div> : '' }
                     </div>
                     <div className="select-form d-flex position-relative align-items-center">
                        <Select name="day" onChange={handleChange}>
                           <option value="" style={{display:'none'}}>Select Day</option>
                           <option value="1">1 Day</option>
                           <option value="2">2 Day</option>
                           <option value="3">3 Day</option>
                        </Select>
                        <FaChevronDown/>
                     </div>
                     {error!==null && error.day ? <div className="error">{error.day}</div> : '' }
                     <div className="btn-payment">
                        <Button type="submit" btnVarian="button-filled">Pay now : Rp {day!==null ? ((qty*vehicle.dataVehicle.price)*day).toLocaleString('id') : 0}</Button>
                     </div>
                     <ModalNotifSuccess show={showModalSuccess} close={handleCloseSuccess} message={reservation.errMessage}/> 
                  </form>
               </div>
            </div>
         </section>
      </Layout>
   );
};

const mapStateToProps = state => ({counter:state.counter,reservation:state.reservation});
export default connect(mapStateToProps)(Reservation);
