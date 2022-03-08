import React, { Component, useEffect, useState } from 'react'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer' 
import {FaChevronDown} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'
import {FaAngleRight} from 'react-icons/fa'
import imgMotorBike1 from '../assets/images/motorbike1.png'
import imgMotorBike3 from '../assets/images/motorbike3.png'
import imgCar2 from '../assets/images/car2.png'
import Layout from '../component/Layout'
import { useDispatch, useSelector,connect } from 'react-redux'
import { getListHistory,getListFilterHistory,deleteHistory } from '../redux/actions/history'
import { getListVehicleByMonth } from '../redux/actions/vehicle'
import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import Button from '../component/Button'


export const History  = ()=> {

    const {history,vehicle} = useSelector(state=>state)
    const [searchParams,setSearchParams] = useSearchParams()
    const [isDelete,setIsDelete] = useState()
    const {id} = useParams()
    const [control,setControl] = useState(false)
    const dispatch = useDispatch()
    const [show,setShow] = useState(-1)
   
    useEffect(()=>{
        const token = window.localStorage.getItem("token")
        dispatch(getListHistory(token))
        dispatch(getListVehicleByMonth())
     },[]);

     useEffect(()=>{
         if(control){
            const token = window.localStorage.getItem("token")
            dispatch(getListHistory(token))
            setControl(false)
            setShow(false)
            dispatch(getListVehicleByMonth())
         }
     },[control])

     const handleFillter = (event)=>{
        event.preventDefault();
        const search = event.target.elements['search'].value
        const token = window.localStorage.getItem("token")
        //   filledForms.forEach((item)=>{
        //     if(event.target.elements[item].value){
        //         dataSearch[item] = event.target.elements[item].value
        //     }
        // })
        setSearchParams({name:search})
        dispatch(getListFilterHistory(token,search))
    }

    const handleDelete = (id)=>{
        const token = window.localStorage.getItem("token")
        dispatch(deleteHistory(token,id))
        setControl(true)
    }
    
    const handleButton = (i) =>{
        setShow(i)
    }

      
    const handleButtonLeave = () =>{
        setShow(-1)
    }

    return (
        <Layout>
            <section className="history container mb-5">
                <div className="row">
                    <div className="col-lg-8 me-4">
                        <form onSubmit={handleFillter} className="search-filter mb-4">
                            <div className="row">
                                <div className="col-md-8 d-flex position-relative">
                                    <input className="form-control search-input" type="search" name="search" placeholder="Search history" aria-label="Search"/>
                                    <button className="btn btn-search position-absolute" type="submit"><FaSearch/></button>
                                </div>
                                <div className="col-md select-form">
                                    <select className="form-select">
                                        <option>Filter</option>
                                        <option value="1">Tipe</option>
                                        <option value="4"></option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="today">
                            <div className="title-date mb-4">Today</div>
                            <div className="d-flex flex-md-wrap justify-content-between list-today">
                                <p>Please finish your payment for Vespa Rental Jogja</p><FaAngleRight/>
                            </div>
                            <div className="d-flex flex-md-wrap justify-content-between list-today">
                                <p>Your payment has been confirmed!</p><FaAngleRight/>
                            </div>
                        </div>
                        <div className="week">
                            <div className="title-date">A week ago</div>
                            <ul className="list-group list-week">
                                {
                                    history.dataHistory!==null && history.dataHistory.filter((item)=>item.user_id==id).map((item,i)=>{
                                        return(
                                            <div className={`row mb-3`}  onMouseLeave={handleButtonLeave} onMouseEnter={()=>handleButton(i)}>
                                                <div className="col-xxl-9">
                                                    <div className="row detail-order">
                                                        <div className="col-md-4">
                                                            <img src={item.photo} alt="motorbike"/>
                                                        </div>
                                                        <div className="col-md">
                                                                <h5 className="card-title">{item.brand}</h5>
                                                                <div className="date">{item.rentStartDate} - {item.rentEndDate}</div>
                                                                <div className="prepayment">Payment : Rp. {item.prepayment.toLocaleString("id")}</div>
                                                                <div className="status">{item.status}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    
                                                            {
                                                                show==i && <Button btnVarian="button-filled" onClick={()=>handleDelete(item.id)}>Delete</Button>  
                                                            }
                                                    </div>
                                                </div>
                                       )
                                    })
                                }
                               
                                {/* <li className="list-group-item d-flex">
                                    <div>
                                        <img src={imgMotorBike1} alt="motorbike"/>
                                    </div>
                                    <div className="ms-4">
                                        <h5 className="card-title">Vespa Matic</h5>
                                        <div className="date">Jan 18 to 21 2021</div>
                                        <div className="prepayment">Prepayment : 245.000</div>
                                        <div className="status">Has been returned</div>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex">
                                        <div>
                                            <img src={imgMotorBike3} alt="motorbike"/>
                                        </div>
                                        <div className="ms-4">
                                            <h5 className="card-title">Vespa Matic</h5>
                                            <div className="date">Jan 18 to 21 2021</div>
                                            <div className="prepayment">Prepayment : 245.000</div>
                                            <div className="status">Has been returned</div>
                                        </div>
                                    </div>
                                    <button className="button-filled">Delete</button>

                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg new-arrival">
                        <div className="d-flex flex-column align-items-center">
                            <div className="title">New Arrival</div>
                                {
                                    vehicle.listVehicle.length > 0 && vehicle.listVehicle.map((item)=>{
                                        return(<div className="position-relative mb-3">
                                            <img src={item.photo} alt="Car2"/>
                                            <div className="text-title-vehicle ">
                                                <div className="vehicle-name">{item.name}</div>
                                                <div className="location">{item.location}</div>
                                            </div>
                                        </div>)
                                    })
                                }
                                {/* <div className="position-relative mb-3">
                                    <img src={imgCar2} alt="Car2"/>
                                    <div className="text-title-vehicle ">
                                        <div className="vehicle-name">Lamborgini</div>
                                        <div className="location">South Jakarta</div>
                                    </div>
                                </div>
                                <div className="list-img position-relative">
                                    <img src={imgCar2} alt="Car4"/>
                                    <div className="text-title-vehicle">
                                        <div className="vehicle-name">Jeep White</div>
                                        <div className="location">Kalimantan</div>
                                    </div>
                                </div> */}
                            <div className="view-more">
                                <div>View More</div>
                                <div className="btn-arrow text-center"><FaChevronDown/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </Layout>
    )
}

export default History
