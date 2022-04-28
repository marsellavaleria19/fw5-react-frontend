/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component,useState,useEffect } from 'react';
import Header from '../component/Header';
import imgTestimoni from '../assets/images/testimonial.png';
import imgPrevious from '../assets/images/previous.png';
import imgNext from '../assets/images/next.png'; 
import {FaChevronRight,FaStar} from 'react-icons/fa';
import {default as axios} from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Image from '../component/Image';
import Layout from '../component/Layout';
import { getPopularVehicle } from '../redux/actions/vehicle';
import { useSelector,useDispatch } from 'react-redux';
import SkeletonComponent from '../component/SkeletonComponent';
import Button from '../component/Button';
import {FaPlus} from 'react-icons/fa';


export const Homepage = ()=> {
   const {vehicle,auth} = useSelector(state=>state);
   const [listPopular,setListPopular] = useState([]);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {REACT_APP_LIMIT_CATEGORY} = process.env; 
 
   useEffect(()=>{
      dispatch(getPopularVehicle());
   },[]);
    
   const goToDetail = (id)=>{
      navigate(`/category/vehicles/${id}`);
   };

   const goToAddVehicle = ()=>{
      navigate('/vehicle/add');
   };

   return (
      <Layout>
         <Header/>
         <section className="popular-town">
            <div className="container">
               <div className="row d-flex align-items-center header">
                  <div className="col">
                     <div className='d-flex align-item-center'>
                        {
                           auth.user!==null && auth.user.role=='admin' && 
                     <Button btnVarian="button-filled button-add-vehicle me-2" type="button" onClick={goToAddVehicle}><FaPlus/></Button>
                        }
                        <h1 className="section-title">Popular in town</h1>
                     </div>
                   
                  </div>
                  <div className="col text-end">
                     <Link className="section-link-view" to="/category">View all<FaChevronRight/></Link>
                  </div>
               </div>
               <div className="row text-center">
                  {
                     vehicle.isLoading ?
                        <SkeletonComponent count={REACT_APP_LIMIT_CATEGORY}/> :
                        vehicle.listVehiclepopular.length >0 ? vehicle.listVehiclepopular.map((item)=>{
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
                           );
                        }) :
                           <div className="no-vehicle text-center">
                        There is no vehicle left
                           </div> 
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
   );
};

export default Homepage;
