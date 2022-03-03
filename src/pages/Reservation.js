import React, { Component,useState,useEffect } from 'react'
import imgDetailVehicle from '../assets/images/detail-vehicle.png'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer' 
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

export const Reservation  = ()=> {

    const [dataVehicle,setDataVehicle] = useState({})

    const {id} = useParams()
    
    const navigate = useNavigate()

    useEffect(()=>{
        getDataVehicle();
    },[]);
    
    const getDataVehicle = async()=>{
        const {data} = await axios.get(`http://localhost:5000/vehicles/${id}`);
        setDataVehicle(data.results);
    }

    const goToReservation = ()=>{
        window.history.back()
    }

    const goToPayment = (id)=>{
        navigate(`/payment/${id}`)
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
                            <Image photo={dataVehicle.photo} alt="detail-vehicle"/>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="title-vehicle">
                            <h1>{dataVehicle.name}</h1>
                            <div className="location">{dataVehicle.location}</div>
                        </div>
                        <div className="status-vehicle">
                            <div className="no-prepayment fw-bold">No Prepayment</div>
                        </div>
                        <form>
                            <div className="form-quantity d-flex button-plus-minus">
                                <Button btnVarian="plus">+</Button>
                                <Input typeInput="number" value="2"/>
                                <Button className="minus">-</Button>
                            </div>
                            <h5>Reservation Date</h5>
                            <div className="mb-3">
                                <Input typeInput="date" variantInput="input-add" placeholder="date"/>
                            </div>
                            <div className="select-form d-flex position-relative align-items-center">
                                <Select value="1">
                                    <option value="1">1 Day</option>
                                    <option value="2">2 Day</option>
                                    <option value="3">3 Day</option>
                                </Select>
                                <FaChevronDown/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="btn-payment">
                    <Button btnVarian="button-filled" onClick={()=>goToPayment(dataVehicle.id)}>Pay now : Rp. 178.000</Button>
                </div>
        </section>
    </Layout>
    )
}

export default Reservation
