/* eslint-disable react/prop-types */
import React, { useEffect,useState } from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {FaChevronLeft} from 'react-icons/fa';
import { useNavigate,useParams } from 'react-router-dom';
import { getDetailReservation } from '../redux/actions/reservation';
import { paymentUpdate } from '../redux/actions/payment';
import { useSelector,connect,useDispatch } from 'react-redux';
import Layout from '../component/Layout';
import Select from '../component/Select';
import Button from '../component/Button';
import { validation } from '../helpers/validation';
import ModalNotifSuccess from '../component/ModalNotifSuccess';
import ModalNotifError from '../component/ModalNotifError';
import ModalLoading from '../component/ModalLoading';
import { getListHistory,getListHistoryByUserId } from '../redux/actions/history';
import { getPopularVehicle } from '../redux/actions/vehicle';

export const Payment = ({paymentUpdate,getDetailReservation})=> {

   const {reservation,payment,paymentType,auth} = useSelector(state=>state);
   const {id} = useParams();
   const [control,setControl] = useState(false);
   const [error,setError] = useState({});
   const dispatch  = useDispatch();
   // const [dataVehicle,setDataVehicle] = useState({})
    
   const navigate = useNavigate();

   useEffect(()=>{
      console.log(reservation);
      getDetailReservation(id);
      setError({});
   },[]);

   useEffect(()=>{
      if(payment.dataPayment!==null && control){
         if(auth.user!==null){
            if(auth.user.role=='admin'){
               dispatch(getListHistory(auth.token));
            }else{
               dispatch(getListHistoryByUserId(auth.token,auth.user.id));
            }
         }
         dispatch(getPopularVehicle());
         goToHistory();
      }
   },[payment.dataPayment]);

   const handlePayment = (event)=>{
      event.preventDefault();
      var paymentMethod = event.target.elements['payment-method'].value;
      var data= {
         'payment method' : paymentMethod
      };

      var requirement = {
         'payment method' : 'choose'
      };

      var validate = validation(data,requirement);

      if(Object.keys(validate).length == 0){
         paymentUpdate(auth.token,reservation.dataReservation.totalPayment,paymentMethod,id);
         setControl(true);
      }else{
         setError(validate);
      }
   };

   useEffect(()=>{
      if(payment.isError==true){
         dispatch({
            type:'PAYMENT_MESSAGE_ERROR'
         });
         window.scrollTo(0,0);
      }
   },[payment.isError]);

   useEffect(()=>{
      if(payment.isSuccess==true){
         dispatch({
            type:'PAYMENT_MESSAGE_SUCCESS'
         });
      }
   },[payment.isSuccess]);
    
   // const getDataVehicle = async()=>{
   //     const {data} = await axios.get(`http://localhost:5000/vehicles/${id}`);
   //     setDataVehicle(data.results);
   // }


   const goToHistory = ()=>{
      navigate('/history');
   };

   const copyCodeHandle = async()=>{
      var copyText = document.getElementById('codePayment').innerHTML;
      await navigator.clipboard.writeText(copyText);
      alert('Text copied!');
   };

   return (
      <Layout>
         {
            <section className="payment container mb-5">
               <div className="header-nav">
                  <FaChevronLeft/>
                  <span>Payment</span>
               </div>
               <ModalLoading showModal={payment.isLoading}/>
               <ModalNotifError message={payment.errMessage} showModal={payment.isError}/> 
               <ModalNotifSuccess message={payment.message} showModal={payment.isSuccess}/>
               <form onSubmit={handlePayment}>
                  <div className="card">
                     <div className="card-header">
                            Booking Details
                     </div>
                     <div className="card-body">
                        <div className="row">
                           <h1>{reservation.dataReservation!==null && reservation.dataReservation.fullname}</h1>
                           <div className="col-md">
                              <div className="text-detail-payment-reservation mt-4">
                                 <div className='title'>Phone :</div>
                                 <div className='detail-book' >{reservation.dataReservation!==null && reservation.dataReservation.mobilePhone}</div>
                              </div>
                              <div className="text-detail-payment-reservation mt-4">
                                 <div className='title'>Reservation Date :</div>
                                 <div className='detail-book'>{reservation.dataReservation!==null && `${reservation.dataReservation.rentStartDate}-${reservation.dataReservation.rentEndDate}`}</div>
                              </div>
                              <div className="text-detail-payment-reservation mt-4">
                                 <div className='d-md-flex justify-content-between'>
                                    <div className='title'> Payment Code:</div>
                                    <div className='code-payment' id="codePayment">{reservation.dataReservation!==null && reservation.dataReservation.bookingCode}</div>
                                    <Button btnVarian={'btn-copy-code'} onClick={copyCodeHandle}>Copy</Button>
                                 </div>
                              </div>
                           </div>
                           <div className="col-md">
                              <div className="payment-transaction text-detail-payment-reservation">
                                 <div className="text-total-payment mb-4">
                                    <div>Total : Rp. {reservation.dataReservation!==null && reservation.dataReservation.totalPayment.toLocaleString('id')}</div>
                                 </div>
                                 <div className='fw-bold'>Payment Method :</div>
                                 <div className="select-form payment-method d-flex position-relative align-items-center">
                                    <Select name="payment-method">
                                       <option className="select-items" value={''}>Select Payment Method</option>
                                       {
                                          paymentType.listPaymentType.length > 0 && paymentType.listPaymentType.map((item)=>{
                                             return (
                                                <option key={item.id} className="select-items" value={item.id}>{item.payment}</option>
                                             );
                                          })
                                       }
                                       {/* <option className="select-items" value="1">Cash</option>
                                       <option className="select-items" value="2">Transfer</option> */}
                                    </Select>
                                    <FaChevronDown/>
                                 </div>
                                 {error!==null && error['payment method'] ? <div className="error">{error['payment method']}</div> : '' }
                              </div>
                           </div>
                        </div> 
                     </div>
                  </div>
                  <div className="card mt-4">
                     <div className="card-header">
                            Order Details
                     </div>
                     <div className="card-body">
                        <div className="row">
                           <div className="col-md-4">
                              <img src={reservation.dataReservation!==null && reservation.dataReservation.photo} className="img-fluid" alt="detail-vehicle"/>
                           </div>
                           <div className="col-md">
                              <h2>{reservation.dataReservation!==null && reservation.dataReservation.brand}</h2>
                              <div className="detail-order justify-content-center mt-3">
                                 <div className='text'>Qty : {reservation.dataReservation!==null && reservation.dataReservation.qty}</div>
                                 <div className='text'>Price : Rp. {reservation.dataReservation!==null && reservation.dataReservation.price.toLocaleString('id')}</div>
                                 <div className='text'>Day : {reservation.dataReservation!==null && reservation.dataReservation.day} days</div>
                              </div>
                              <div className="total-order fw-bold mt-4">Total : Rp. {reservation.dataReservation!==null && reservation.dataReservation.totalPayment.toLocaleString('id')}</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="btn-payment">
                     <button className="button-filled" type='submit'>Finish payment : <span className="text-danger fw-load">59:30</span></button>
                  </div>
               </form>
            </section>
         }
         {/* <section className="payment container mb-5">
            <div className="header-nav">
                <FaChevronLeft/>
                <span>Payment</span>
            </div>
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <div className="img-vehicle">
                         <img src={reservation.dataReservation.photo} alt="detail-vehicle"/>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="title-vehicle">
                        <h1>{reservation.dataReservation.brand}</h1>
                        <div className="location">{reservation.dataReservation.location}</div>
                    </div>
                    <div className="text-status fw-bold mt-4">{reservation.dataReservation.status}</div>
                    <div className="code-payment mt-3">
                        <h1>#FG1209878YZS</h1>
                    </div>
                    <div className="btn-copy-code mt-3">
                        <button className="button-filled">Copy booking code</button>
                    </div>

                </div>
            </div>
            <div className="reservation-detail text-detail-payment-reservation mt-4">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="qty d-flex align-items-center justify-content-center fw-bold">Qty : {reservation.dataReservation.qty}</div>
                    </div>
                    <div className="col-md">
                        <div className="date d-flex justify-content-between align-items-center">
                            <div className="fw-bold">Reservation Date : </div>
                            <div>Jan 18 - 20 2021</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-payment text-detail-payment-reservation mt-4">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="detail-order justify-content-center">
                            <h5>Order details :</h5>
                            <ul>
                                <li>1 bike : Rp. 78.000 </li>
                                <li>1 bike : Rp. 78.000</li>
                            </ul>
                            <div className="total fw-bold">Total : 178.000</div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="identity">
                            <h5>Identity : </h5>
                            <ul>
                                <li>Samantha Doe (+6290987682) </li>
                                <li>samanthadoe@mail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-transaction text-detail-payment-reservation mt-4">
                <div className="row">
                    <div className="col-xl-4 mb-3">
                        <label for="inputPassword" className="col-form-label">Payment Code : </label>
                    </div>
                    <div className="col-lg-6 col-xl mb-3">
                    <div className="d-flex position-relative payment-code align-items-center">
                        <input type="text" className="form-control payment-code" value="#FG1209878YZS"/>
                        <button className="button-dark position-absolute">Copy</button>
                    </div>
                    </div>
                    <div className="col-lg-6 col-xl">
                        <div className="select-form payment-method d-flex position-relative align-items-center">
                            <select className="form-select">
                                <option className="select-items">Select Payment Method</option>
                                <option className="select-items" value="1">Cash</option>
                                <option className="select-items" value="2">Transfer</option>
                            </select>
                            <FaChevronDown/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-payment">
                <button className="button-filled" onclick="window.location='./detail-vehicle.html';">Finish payment : <span className="text-danger fw-load">59:30</span></button>
            </div>
        </section> */}
      </Layout>
   );
};

const mapStateToProps = state => ({reservation:state.reservation,payment:state.payment});
const mapDispatchToProps = {paymentUpdate,getDetailReservation};
export default connect(mapStateToProps,mapDispatchToProps)(Payment);
