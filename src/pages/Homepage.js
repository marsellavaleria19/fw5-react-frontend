import React, { Component,useState,useEffect } from 'react'
import Header from '../component/Header';
import imgTestimoni from '../assets/images/testimonial.png';
import imgPrevious from '../assets/images/previous.png';
import imgNext from '../assets/images/next.png'; 
import {FaChevronRight,FaStar} from 'react-icons/fa'
import {default as axios} from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Image from '../component/Image';
import Layout from '../component/Layout';

export const Homepage = ()=> {
    const [listPopular,setListPopular] = useState([])
    const navigate = useNavigate();
    const {REACT_APP_URL} = process.env 
 
    useEffect(()=>{
        getDataPopularTown()
    },[]);
    
    const getDataPopularTown = async()=>{
        const {data} = await axios.get(`${REACT_APP_URL}/popular?limit=4`);
        setListPopular(data.results);
    }
    const goToDetail = (id)=>{
        navigate(`/category/vehicle/${id}`)
    }

    return (
      <Layout>
        <Header/>
        <section className="popular-town">
            <div className="container">
                <div className="row d-flex align-items-center header">
                    <div className="col">
                        <h1 className="section-title">Popular in town</h1>
                    </div>
                    <div className="col text-end">
                        <Link className="section-link-view" to="/category">View all<FaChevronRight/></Link>
                    </div>
                </div>
                <div className="row text-center">
                  {
                      listPopular.map((item)=>{
                          return(
                            <div onClick={()=>goToDetail(item.id)} key={String(item.id)} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                <div className="d-inline-block position-relative">
                                    <Image photo={item.photo} photoVarian='img-fluid' alt="Popular1" />
                                    <div className="text-title-vehicle">
                                        <div className="vehicle-name">{item.name}</div>
                                        <div className="location">{item.location}</div>
                                    </div>
                                </div>
                            </div>
                          )
                      })
                  }
                </div>
            </div>
        </section>
        <section className="testimonial container">
            <div className="header">
                <h1 className="section-title">Testimonial</h1>
            </div>
            <div className="row d-flex flex-column-reverse flex-md-row">
                <div className="col-sm">
                    <div className="star">
                        <span><FaStar/></span>
                        <span><FaStar/></span>
                        <span><FaStar/></span>
                        <span><FaStar/></span>
                        <span><FaStar/></span>
                    </div>
                    <p>”It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!”</p>
                    <div className="name"><h5>Edward Newgate</h5>
                        <h6 className="location">Founder Circle</h6>
                    </div>
                </div>
                <div className="col-md text-center">
                    <div className="d-inline-block position-relative">
                        <Image photo={imgTestimoni} alt="Testimonial"/>
                        <div className=" position-absolute button-slide">
                            <Image photo={imgPrevious} alt="prev"/>
                            <Image photo={imgNext} alt="next"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </Layout>
    )
  }

export default Homepage;
