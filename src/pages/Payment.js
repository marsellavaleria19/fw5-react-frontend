import React, { Component } from 'react'
import {FaChevronDown} from 'react-icons/fa'
import {FaChevronLeft} from 'react-icons/fa'
import imgDetailVehicle from '../assets/images/detail-vehicle.png'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer' 

export default class Payment extends Component {
  render() {
    return (
      <>
        <NavbarHomeSearch/>
        <section className="payment container mb-5">
            <div className="header-nav">
                <FaChevronLeft/>
                <span>Payment</span>
            </div>
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <div className="img-vehicle">
                        <img src={imgDetailVehicle} alt="detail-vehicle"/>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="title-vehicle">
                        <h1>Fixie-Gray Only</h1>
                        <div className="location">Yogyakarta</div>
                    </div>
                    <div className="text-status fw-bold mt-4">No Prepayment</div>
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
                        <div className="qty d-flex align-items-center justify-content-center fw-bold">Qty : 2 bikes</div>
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
                {/* <div className="row">
                    <div className="col-md-7">
                        <div className="d-flex">
                            <label for="inputPassword" className="col-form-label">Payment Code : </label>
                            <div className="d-flex position-relative payment-code align-items-center">
                                <input type="text" className="form-control payment-code" value="#FG1209878YZS"/>
                                <button className="button-dark position-absolute">Copy</button>
                            </div>

                        </div>
                    </div>

                    <div className="col-md align-items-center">
                        <div className="select-form payment-method d-flex position-relative align-items-center">
                            <select className="form-select">
                                <option className="select-items">Select Payment Method</option>
                                <option className="select-items" value="1">Cash</option>
                                <option className="select-items" value="2">Transfer</option>
                            </select>
                            <FaChevronDown/>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="btn-payment">
                <button className="button-filled" onclick="window.location='./detail-vehicle.html';">Finish payment : <span className="text-danger fw-load">59:30</span></button>
            </div>
        </section>
        <Footer/>
      </>
    )
  }
}
