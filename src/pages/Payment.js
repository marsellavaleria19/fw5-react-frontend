import React, { Component,useEffect,useState } from 'react'
import {FaChevronDown} from 'react-icons/fa'
import {FaChevronLeft} from 'react-icons/fa'
import imgDetailVehicle from '../assets/images/detail-vehicle.png'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer' 
import { useNavigate,useParams } from 'react-router-dom'
import { getDetailReservation } from '../redux/actions/reservation'
import { paymentUpdate } from '../redux/actions/payment'
import { useDispatch, useSelector } from 'react-redux'
import Reservation from './Reservation'
import Layout from '../component/Layout'
import Select from '../component/Select'

export const Payment = ()=> {

    const {reservation,payment} = useSelector(state=>state)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [control,setControl] = useState(false)
    // const [dataVehicle,setDataVehicle] = useState({})
    
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getDetailReservation(id))
    },[]);

    useEffect(()=>{
        if(payment.dataPayment!==null && control){
            goToHistory(payment.dataPayment.user_id)
        }
    },[payment.dataPayment]);

    const handlePayment = (event)=>{
        event.preventDefault()
        const token = window.localStorage.getItem('token')
        var paymentMethod = event.target.elements["payment-method"].value
        dispatch(paymentUpdate(token,reservation.dataReservation.totalPayment,paymentMethod,id))
        setControl(true)
    }
    
    // const getDataVehicle = async()=>{
    //     const {data} = await axios.get(`http://localhost:5000/vehicles/${id}`);
    //     setDataVehicle(data.results);
    // }

    const goToPayment = ()=>{
        window.history.back()
    }

    const goToHistory = (id)=>{
        navigate(`/history/${id}`)
    }

    return (
      <Layout>
          {
               <section className="payment container mb-5">
                    <div className="header-nav">
                        <FaChevronLeft/>
                        <span>Payment</span>
                    </div>
                    <form onSubmit={handlePayment}>
                    <div class="card">
                        <div class="card-header">
                            Booking Details
                        </div>
                        <div class="card-body">
                            <div className="row">
                                <h1>{reservation.dataReservation!==null && reservation.dataReservation.fullName}</h1>
                                <div className="col-md">
                                    <div className="text-detail-payment-reservation mt-4">
                                        <div className='title'>Phone :</div>
                                        <div className='detail-book' >{reservation.dataReservation!==null && reservation.dataReservation.mobileNumber}</div>
                                    </div>
                                    <div className="text-detail-payment-reservation mt-4">
                                        <div className='title'>Reservation Date :</div>
                                        <div className='detail-book'>{reservation.dataReservation!==null && `${reservation.dataReservation.rentStartDate}-${reservation.dataReservation.rentEndDate}`}</div>
                                    </div>
                                   
                                </div>
                                <div className="col-md">
                                    <div className="payment-transaction text-detail-payment-reservation">
                                        <div className="text-total-payment mb-4">
                                            <div>Total : Rp. {reservation.dataReservation!==null && reservation.dataReservation.totalPayment.toLocaleString("id")}</div>
                                        </div>
                                        <div className='fw-bold'>Payment Method :</div>
                                        <div className="select-form payment-method d-flex position-relative align-items-center">
                                            <Select name="payment-method">
                                                <option className="select-items">Select Payment Method</option>
                                                <option className="select-items" value="1">Cash</option>
                                                <option className="select-items" value="2">Transfer</option>
                                            </Select>
                                            <FaChevronDown/>
                                        </div>
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
                                        <div className='text'>Price : Rp. {reservation.dataReservation!==null && reservation.dataReservation.price.toLocaleString("id")}</div>
                                        <div className='text'>Day : {reservation.dataReservation!==null && reservation.dataReservation.day} days</div>
                                    </div>
                                    <div className="total-order fw-bold mt-4">Total : Rp. {reservation.dataReservation!==null && reservation.dataReservation.totalPayment.toLocaleString("id")}</div>
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
    )
}

export default Payment
