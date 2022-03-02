import React, { Component,useEffect,useState } from 'react'
import imgDetailVehicle from '../assets/images/detail-vehicle.png'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer'
import {FaChevronLeft} from 'react-icons/fa'
import {FaChevronRight} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
import {default as axios} from 'axios'
import { useParams } from 'react-router-dom'
import Layout from '../component/Layout'
import { Link,useNavigate } from 'react-router-dom'

export const  DetailVehicle =  ()=> {

    const [dataVehicle,setDataVehicle] = useState({})

    const {id} = useParams()
    const navigate = useNavigate()

    const {REACT_APP_URL} = process.env 

    useEffect(()=>{
        getDataVehicle();
    },[]);
    
    const getDataVehicle = async()=>{
        const {data} = await axios.get(`${REACT_APP_URL}/vehicles/${id}`);
        setDataVehicle(data.results);
    }

    const goToReservation = (id)=>{
        navigate(`/reservation/${id}`)
    }

    const goToDetail = ()=>{
        window.history.back()
    }
 
    return (
        <Layout>
            {
                Object.keys(dataVehicle) ? 
                <section className="detail-vehicle container mb-5">
                    <div onClick={goToDetail} className="header-nav">
                        <FaChevronLeft/>
                        <span>Detail</span>
                    </div>
                <div className="row container">
                    <div className="col-md">
                        <div className="img-vehicle">
                            <img src={dataVehicle.photo} alt="detail-vehicle"/>
                        </div>
                        <div className="row-md">
                            <div className="row img-vehicle-detail align-items-center">
                                <div className="col-2">
                                    <div className="arrow-button me-3">
                                        <FaChevronLeft/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <img src={dataVehicle.photo} className="me-4" alt="Detail Vehicle"/>
                                </div>
                                <div className="col-4">
                                    <img src={dataVehicle.photo} alt="Detail Vehicle"/>
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
                            <h1>{dataVehicle.name}</h1>
                            <div className="location">{dataVehicle.location}</div>
                        </div>
                        <div className="status-vehicle">
                            <div className="text-success fw-bold mb-2">Available</div>
                            <div className="no-prepayment">No Prepayment</div>
                        </div>
                        <div className="detail-info">
                            <div className="mb-2">Capacity : 1 person</div>
                            <div className="mb-2">Type:{dataVehicle.category}</div>
                            <div>Reservation before 2 PM</div>
                        </div>
                        <div className="price">
                            <h1 className="text-end">Rp. {dataVehicle.price?.toLocaleString("id")}/day</h1>
                        </div>
                        <form>
                            <div className="form-quantity d-flex button-plus-minus">
                                <button className="plus">+</button>
                                <input type="number" value="2"/>
                                <button className="minus">-</button>
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
                            <button onClick={()=>goToReservation(dataVehicle.id)} className="button-filled btn-reservation">Reservation</button>
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
   
        {/* <NavbarHomeSearch/>
        <section className="detail-vehicle container mb-5">
            <div className="header-nav">
                <FaChevronLeft/>
                <span>Detail</span>
            </div>
            <div className="row container">
                <div className="col-md">
                    <div className="img-vehicle">
                        <img src={imgDetailVehicle} alt="detail-vehicle"/>
                    </div>
                    <div className="row-md">
                        <div className="d-flex justify-content-left img-vehicle-detail align-items-center">
                            <div className="arrow-button me-3">
                               <FaChevronLeft/>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center">
                                <img src={imgDetailVehicle} className="me-4" alt="Detail Vehicle"/>
                                <img src={imgDetailVehicle} alt="Detail Vehicle"/>
                            </div>
                            <div className="arrow-button ms-3">
                                <FaChevronRight/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md justify-sm-content-center">
                    <div className="title-vehicle">
                        <h1>Fixie-Gray Only</h1>
                        <div className="location">Yogyakarta</div>
                    </div>
                    <div className="status-vehicle">
                        <div className="text-success fw-bold mb-2">Available</div>
                        <div className="no-prepayment">No Prepayment</div>
                    </div>
                    <div className="detail-info">
                        <div className="mb-2">Capacity : 1 person</div>
                        <div className="mb-2">Type:Bike</div>
                        <div>Reservation before 2 PM</div>
                    </div>
                    <div className="price">
                        <h1 className="text-end">Rp.78.000/day</h1>
                    </div>
                    <form>
                        <div className="form-quantity d-flex button-plus-minus">
                            <button className="plus">+</button>
                            <input type="number" value="2"/>
                            <button className="minus">-</button>
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
                        <button className="button-filled btn-reservation" onclick="window.location='./reservation.html';">Reservation</button>
                    </div>
                    <div className="col-lg-2 col-md-3 mb-3">
                        <button className="button-dark btn-like d-flex justify-content-center align-items-center">
                            <FaHeart/>Like</button>
                    </div>
                </div>
            </div>
        </section>
        <Footer/> */}
      </Layout>
    )
}

export default DetailVehicle 
