import React, { Component,useState,useEffect } from 'react'
import {FaChevronDown} from 'react-icons/fa'
import {FaChevronLeft} from 'react-icons/fa'
import Layout from '../component/Layout'
import { useParams } from 'react-router-dom'
import {default as axios} from 'axios'
import { useNavigate } from 'react-router-dom'
import Image from '../component/Image'
import Button from '../component/Button'
import Input from '../component/Input'
import Select from '../component/Select'
import { increment,decrement } from '../redux/actions/counter'
import { getDetailVehicle } from '../redux/actions/vehicle'
import { reservationInput } from '../redux/actions/reservation'
import { connect, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export const Reservation  = ({reservationInput})=> {

    const {counter,vehicle,reservation,auth} = useSelector(state=>state)
    
    const [totalPayment,setTotalPayment] = useState(0)

    const [day,setDay] = useState(0)

    const [qty,setQty] = useState()

    const dispatch = useDispatch()

    const [dataVehicle,setDataVehicle] = useState({})

    const {id} = useParams()
    
    const navigate = useNavigate()

    useEffect(()=>{
        // getDataVehicle();
        dispatch(getDetailVehicle(id))
        setQty(counter.num)
        console.log(reservation.dataReservation)
        if(reservation.dataReservation!==null){
            goToPayment(reservation.dataReservation.id)
        }

    },[]);

    useEffect(()=>{
        if(reservation.dataReservation!==null){
            goToPayment(reservation.dataReservation.id)
        }
    });
    // const getDataVehicle = async()=>{
    //     const {data} = await axios.get(`http://localhost:5000/vehicles/${id}`);
    //     setDataVehicle(data.results);
    // }

    const goToReservation = ()=>{
        window.history.back()
    }

    const goToPayment = (id)=>{
        navigate(`/payment/${id}`)
    }

    const countIncrement = (event) =>{
        event.preventDefault()
        dispatch(increment())
        setQty(counter.num)
    }

    const countDecrement = (event) =>{
        event.preventDefault()
        dispatch(decrement())
        setQty(counter.num)
    }

    const handleChange = (event) =>{
        let value = event.target.value
        if(event.target.name=="qty"){
            setQty(value)
        }
        
        if(event.target.name=="day"){
            setDay(value)
        }
    }


    const reservationHandle = (event) => {
        event.preventDefault()
        const token = window.localStorage.getItem('token')
        var qty = event.target.elements["qty"].value
        var date = event.target.elements["date"].value
        var day = event.target.elements["day"].value
        var data = {qty:qty,date:date,day:day,vehicle:vehicle.listVehicle.id,user:auth.user!==null && auth.user.id}
        reservationInput(data,token)
        if(!reservation.isError){
            goToPayment(reservation.dataReservation.id)
        }
    }

    return (
            <Layout>
            <section className="reservation container mb-5">
                <div onClick={goToReservation} className="header-nav">
                    <FaChevronLeft/>
                    <span>Reservation</span>
                </div>
                <div className="row">
                    <div className="col-md">
                        <div className="img-vehicle">
                            <Image photo={vehicle.listVehicle.photo} alt="detail-vehicle"/>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="title-vehicle">
                            <h1>{vehicle.listVehicle.name}</h1>
                            <div className="location">{vehicle.listVehicle.location}</div>
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
                            <h5>Reservation Date</h5>
                            <div className="mb-3">
                                <Input typeInput="date" name="date" variantInput="input-add" placeholder="date"/>
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
                            <div className="btn-payment">
                                <Button type="submit" btnVarian="button-filled">Pay now : Rp {day!==null ? ((qty*vehicle.listVehicle.price)*day).toLocaleString("id") : 0}</Button>
                            </div>
                        </form>
                    </div>
                </div>
        </section>
    </Layout>
    )
}

const mapStateToProps = state => ({counter:state.counter,reservation:state.reservation})
const mapDispatchToProps = {reservationInput}
export default connect(mapStateToProps,mapDispatchToProps)(Reservation)
