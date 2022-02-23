import React, { Component } from 'react'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer' 
import {FaChevronDown} from 'react-icons/fa'
import {FaSearch} from 'react-icons/fa'
import {FaAngleRight} from 'react-icons/fa'
import imgMotorBike1 from '../assets/images/motorbike1.png'
import imgMotorBike3 from '../assets/images/motorbike3.png'
import imgCar2 from '../assets/images/car2.png'

export default class History extends Component {
  render() {
    return (
        <>
            <NavbarHomeSearch/>
            <section className="history container mb-5">
                <div className="row">
                    <div className="col-lg-8 me-4">
                        <form className="search-filter mb-4">
                            <div className="row">
                                <div className="col-md-8 d-flex position-relative">
                                    <input className="form-control search-input" type="search" placeholder="Search history" aria-label="Search"/>
                                    <button className="btn btn-search position-absolute" type="submit"><FaSearch/></button>
                                </div>
                                <div className="col-md select-form">
                                    <select className="form-select">
                                        <option>Filter</option>
                                        <option value="1">Tipe</option>
                                        <option value="2">Date Added</option>
                                        <option value="3">name</option>
                                        <option value="4">Favorite Product</option>
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
                                <li className="list-group-item d-flex">
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

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg new-arrival">
                        <div className="d-flex flex-column align-items-center">
                            <div className="title">New Arrival</div>
                            <div className="position-relative mb-3">
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
                            </div>
                            <div className="view-more">
                                <div>View More</div>
                                <div className="btn-arrow text-center"><FaChevronDown/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
      </>
    )
  }
}
