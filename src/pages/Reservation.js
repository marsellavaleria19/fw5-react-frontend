import React, { Component } from 'react'
import imgDetailVehicle from '../assets/images/detail-vehicle.png'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer' 
import {FaChevronDown} from 'react-icons/fa'
import {FaChevronLeft} from 'react-icons/fa'

export default class Reservation extends Component {
  render() {
    return (
        <>
            <NavbarHomeSearch/>
            <section className="reservation container mb-5">
                <div className="header-nav">
                    <FaChevronLeft/>
                    <span>Reservation</span>
                </div>
                <div className="row">
                    <div className="col-md">
                        <div className="img-vehicle">
                            <img src={imgDetailVehicle} alt="detail-vehicle"/>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="title-vehicle">
                            <h1>Fixie-Gray Only</h1>
                            <div className="location">Yogyakarta</div>
                        </div>
                        <div className="status-vehicle">
                            <div className="no-prepayment fw-bold">No Prepayment</div>
                        </div>
                        <form>
                            <div className="form-quantity d-flex button-plus-minus">
                                <button className="plus">+</button>
                                <input type="number" value="2"/>
                                <button className="minus">-</button>
                            </div>
                            <h5>Reservation Date</h5>
                            <div className="mb-3">
                                <input type="date" className="form-control input-add" placeholder="date"/>
                            </div>
                            <div className="select-form d-flex position-relative align-items-center">
                                <select className="form-select" value="1">
                                    <option value="1">1 Day</option>
                                    <option value="2">2 Day</option>
                                    <option value="3">3 Day</option>
                                </select>
                                <FaChevronDown/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="btn-payment">
                    <button className="button-filled" onclick="window.location='./payment.html';">Pay now : Rp. 178.000</button>
                </div>
        </section>
        <Footer/>
      </>
    )
  }
}
