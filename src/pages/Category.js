import React, { Component } from 'react'
import Footer from '../component/Footer'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import imgPopular1 from '../assets/images/popular1.png';
import imgPopular2 from '../assets/images/popular2.png';
import imgPopular3 from '../assets/images/popular3.png';
import imgPopular4 from '../assets/images/popular4.png';
import imgCar2 from '../assets/images/car2.png';
import imgCar4 from '../assets/images/car4.png';
import imgMotorBike1 from '../assets/images/motorbike1.png';
import imgMotorBike3 from '../assets/images/motorbike3.png';
import imgBike1 from '../assets/images/bike1.png';
import imgBike2 from '../assets/images/bike2.png';
import imgBike3 from '../assets/images/bike3.png';
import imgBike4 from '../assets/images/bike4.png';
import {FaChevronRight} from 'react-icons/fa'
export default class Category extends Component {
  render() {
    return (
        <>
            <NavbarHomeSearch/>
            <section className="popular-town">
                <div className="container">
                    <div className="row d-flex align-items-center header">
                        <div className="col">
                            <h1 className="section-title">Popular in town</h1>
                        </div>
                        <div className="col text-end">
                            <a className="section-link-view">View all<FaChevronRight/></a>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div class="d-inline-block position-relative">
                                <img src={imgPopular1} alt="Popular1" />
                                <div class="text-title-vehicle">
                                    <div class="vehicle-name">Merapi</div>
                                    <div class="location">Yogyakarta</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div class="d-inline-block position-relative">
                                <img src={imgPopular2} alt="Popular2" />
                                <div class="text-title-vehicle">
                                    <div class="vehicle-name">Teluk Bogam</div>
                                    <div class="location">Kalimantan</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3  mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgPopular3} alt="Popular3"/>
                                <div class="text-title-vehicle">
                                    <div class="vehicle-name">Bromo</div>
                                    <div class="location">Malang</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 ">
                            <div class="d-inline-block position-relative">
                                <img src={imgPopular4} alt="Popular4" />
                                <div class="text-title-vehicle">
                                    <div class="vehicle-name">Malioboro</div>
                                    <div class="location">Yogyakarta</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="popular-town">
                <div className="container">
                    <div className="row d-flex align-items-center header">
                        <div className="col">
                            <h1 className="section-title">Cars</h1>
                        </div>
                        <div className="col text-end">
                            <a className="section-link-view">View all<FaChevronRight/></a>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div class="d-inline-block position-relative">
                                <img src={imgPopular1} alt="Car1" />
                                <div class="text-title-vehicle">
                                    <div className="vehicle-name">Van</div>
                                    <div className="location">Yogyakarta</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgCar2} alt="Car2"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Lamborgini</div>
                                    <div className="location">South Jakarta</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3  mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgPopular3} alt="Car3"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Jeep</div>
                                    <div className="location">Malang</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 ">
                            <div class="d-inline-block position-relative">
                                <img src={imgCar4} alt="Car4"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Jeep White</div>
                                    <div className="location">Kalimantan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="popular-town">
                <div className="container">
                    <div className="row d-flex align-items-center header">
                        <div className="col">
                            <h1 className="section-title">Motor Bike</h1>
                        </div>
                        <div className="col text-end">
                            <a className="section-link-view">View all<FaChevronRight/></a>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgMotorBike1} alt="Bike1" />
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Vespa</div>
                                    <div className="location">Yogyakarta</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgPopular2} alt="Car2"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Honda KLX</div>
                                    <div className="location">Kalimantan</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3  mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgMotorBike3} alt="Bike3"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Honda</div>
                                    <div className="location">Malang</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 ">
                            <div class="d-inline-block position-relative">
                                <img src={imgPopular4} alt="Bike4"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Matic Bike</div>
                                    <div className="location">Yogyakarta</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="popular-town">
                <div className="container">
                    <div className="row d-flex align-items-center header">
                        <div className="col">
                            <h1 className="section-title">Motor Bike</h1>
                        </div>
                        <div className="col text-end">
                            <a className="section-link-view">View all<FaChevronRight/></a>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgBike1} alt="Bike1" />
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Fixie</div>
                                    <div className="location">Yogyakarta</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgBike2} alt="Bike2"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Sport Bike</div>
                                    <div className="location">Kalimantan</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3  mb-4">
                            <div class="d-inline-block position-relative">
                                <img src={imgBike3} alt="Bike3"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Ontel</div>
                                    <div className="location">Malang</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3 ">
                            <div class="d-inline-block position-relative">
                                <img src={imgBike4} alt="Bike4"/>
                                <div className="text-title-vehicle">
                                    <div className="vehicle-name">Fixie Gray</div>
                                    <div className="location">Yogyakarta</div>
                                </div>
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
