import React, { Component } from 'react'
import Header from '../component/Header';
import Footer from '../component/Footer';
import imgPopular1 from '../assets/images/popular1.png';
import imgPopular2 from '../assets/images/popular2.png';
import imgPopular3 from '../assets/images/popular3.png';
import imgPopular4 from '../assets/images/popular4.png';
import imgTestimoni from '../assets/images/testimonial.png';
import imgPrevious from '../assets/images/previous.png';
import imgNext from '../assets/images/next.png'; 

export class Homepage extends Component {
  render() {
    return (
      <>
        <Header/>
        <section className="popular-town">
        <div className="container">
            <div className="d-flex justify-content-between mb-5 header">
                <h1 className="section-title">Popular in town</h1>
                <a className="section-link-view mt-2 me-5">View all <i classNameName="fa-solid fa-chevron-right"></i></a>
            </div>
            <div classNameName="d-flex col-flex-xs flex-md-wrap">
                <div classNameName="me-4 mb-md-photo">
                    <div classNameName="position-relative">
                        <img src={imgPopular1} alt="Popular1" />
                        <div classNameName="text-title-vehicle">
                            <div classNameName="vehicle-name">Merapi</div>
                            <div classNameName="location">Yogyakarta</div>
                        </div>
                    </div>
                </div>
                <div className="me-4 mb-md-photo">
                    <div className="position-relative">
                        <img src={imgPopular2} alt="Popular2"/>
                        <div className="text-title-vehicle">
                            <div className="vehicle-name">Teluk Bogam</div>
                            <div className="location">Kalimantan</div>
                        </div>
                    </div>
                </div>
                <div className="me-4 mb-md-photo">
                    <div className="position-relative">
                        <img src={imgPopular3} alt="Popular3"/>
                        <div className="text-title-vehicle">
                            <div className="vehicle-name">Bromo</div>
                            <div className="location">Malang</div>
                        </div>
                    </div>
                </div>
                <div className="me-4 mb-md-photo">
                    <div className="position-relative">
                        <img src={imgPopular4} alt="Popular4"/>
                        <div className="text-title-vehicle">
                            <div className="vehicle-name">Malioboro</div>
                            <div className="location">Yogyakarta</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="testimonial container">
        <div className="header">
            <h1 className="section-title">Testimonial</h1>
        </div>
        <div className="row d-flex flex-column-reverse flex-sm-row">
            <div className="col-sm">
                <div className="star">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
                <p>”It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!”</p>
                <div className="name"><h5>Edward Newgate</h5>
                    <h6 className="location">Founder Circle</h6>
                </div>
            </div>
            <div className="col-sm">
                <div className="d-inline-block position-relative">
                    <img src={imgTestimoni} alt="Testimonial"/>
                    <div className=" position-absolute button-slide">
                        <img src={imgPrevious} alt="prev"/>
                        <img src={imgNext} alt="next"/>
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

export default Homepage;
