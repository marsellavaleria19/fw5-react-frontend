/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component,useEffect,useState } from 'react';
import Layout from '../component/Layout';
import {default as axios} from 'axios';
import { useNavigate, useParams,useSearchParams } from 'react-router-dom';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { getListVehicleByCategory,getListVehicleByUrl } from '../redux/actions/vehicle';
import { getDetailCategory,getDataCategory } from '../redux/actions/category';
import Image from '../component/Image';
import Button from '../component/Button';
import {connect, useDispatch, useSelector } from 'react-redux';
import ListVehicleComponent from '../component/ListVehicleComponent';
import { getDataVehicle } from '../redux/actions/vehicle';

export const ListVehicle = ()=> {

   const {category,vehicle} = useSelector(state=>state);
   const dispatch = useDispatch();
   const [listVehicle,setListVehicle] = useState([]);
   const [isNextPage,setIsNextPage] = useState(false);
   const [page,setPage] = useState([]);
   const [searchParams,setSearchParams] = useSearchParams();
   const [show,setShow] = useState(-1);

   // const [vehicle,setVehicle] = useState("");
   const {id} = useParams();
   const {REACT_APP_URL,REACT_APP_LIMIT_VEHICLE} = process.env; 
    
   useEffect(()=>{
      dispatch(getDetailCategory(id));
      dispatch(getListVehicleByCategory(id,REACT_APP_LIMIT_VEHICLE));
   },[]);
    
   const navigate = useNavigate();
    
   const goToDetail = (item)=>{
      dispatch(getDataVehicle(item));
      dispatch({
         type:'CLEAR_COUNTER'
      });
      navigate(`/vehicle/${item.id}`);
   };

   const getNextData = (url)=>{
      dispatch(getListVehicleByUrl(url));
      //  setListVehicle([...listVehicle,...vehicle.listVehicle])
   };

   return (
      <>
         <Layout>
            <section className="popular-town">
               <div className="container">
                  {
                     vehicle.listVehicle.length > 0  ? 
                        <>
                           <div className="title">
                              {
                                 Object.keys(category.listCategory).length > 0 &&  <h1 className="section-title mb-2">{category.listCategory.name}</h1>
                              }
                            
                              <div className="info text-center mb-5">Click item to see details and reservation</div>
                           </div>
                           <div className="row text-center">
                              {
                                 vehicle.listVehicle.map((item)=>{
                                    return(
                                       <ListVehicleComponent key={item.id} name={item.name} location={item.location} photo={item.photo} onClick={()=>goToDetail(item)}/>
                                    // <div  key={String(item.id)} onClick={()=>goToDetail(item.id)} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                    //    <div className="d-inline-block position-relative">
                                    //       <Image photo={item.photo} photoVarian="img-fluid" alt={`${item.name}`} />
                                    //       <div className="text-title-vehicle">
                                    //          <div className="vehicle-name">{item.name}</div>
                                    //          <div className="location">{item.location}</div>
                                    //       </div>
                                    //    </div>
                                    // </div>
                                    );
                                 })
                              }
                           </div>
                           {
                              vehicle.pageInfo.next!==null ? 
                                 <div className='text-center mt-5 mb-5'>
                                    <Button onClick={()=>getNextData(vehicle.pageInfo.next)} btnVarian='btn-next'>Load more <FaAngleDoubleDown/></Button>
                                 </div> : ''
                           }
                        </>   
                        : 
                        <div className="no-vehicle text-center">
                        There is no vehicle left
                        </div> 
                  }
               </div>
            </section> 
         </Layout>
         {/* <Layout>
            <section className="popular-town">
                <div className="container">
                    <div class="title">
                        <h1 class="section-title mb-2">Popular in town</h1>
                        <div class="info text-center mb-5">Click item to see details and reservation</div>
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
                    <div class="no-vehicle text-center">
                        There is no vehicle left
                    </div>
                </div>
            </section>
        </Layout> */}
      </>
   );
};

export default ListVehicle;