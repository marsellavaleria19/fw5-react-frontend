/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {FaAngleRight} from 'react-icons/fa';
import Layout from '../component/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory,deleteHistory, getListHistoryFilter } from '../redux/actions/history';
import { getListVehicleByMonth } from '../redux/actions/vehicle';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Button from '../component/Button';


export const History  = ()=> {

   const {history,vehicle} = useSelector(state=>state);
   const [searchParams,setSearchParams] = useSearchParams();
   const [isDelete,setIsDelete] = useState();
   const {id} = useParams();
   const [control,setControl] = useState(false);
   const dispatch = useDispatch();
   const [show,setShow] = useState(-1);
   const [filledParams,setFilledParams] = useState(['category_id','location','payment_id','name','date']);
   const [dataSearch,setDataSearch] = useState({});
   
   useEffect(()=>{
      const token = window.localStorage.getItem('token');
      dispatch(getListHistory(token));
      dispatch(getListVehicleByMonth());
   },[]);

   useEffect(()=>{
      if(control){
         const token = window.localStorage.getItem('token');
         dispatch(getListHistory(token));
         setControl(false);
         setShow(false);
         dispatch(getListVehicleByMonth());
      }
   },[control]);

   const handleFillter = async(event)=>{
      event.preventDefault();
      filledParams.forEach((item)=>{
         if(event.target.elements[item].value){
            dataSearch[item] = event.target.elements[item].value;
         }
      });
      setSearchParams(dataSearch);
      dispatch(getListHistoryFilter(dataSearch));
   };

   //  const handleFillter = (event)=>{
   //     event.preventDefault();
   //     const search = event.target.elements['search'].value
   //     const token = window.localStorage.getItem("token")
   //     //   filledForms.forEach((item)=>{
   //     //     if(event.target.elements[item].value){
   //     //         dataSearch[item] = event.target.elements[item].value
   //     //     }
   //     // })
   //     setSearchParams({name:search})
   //     dispatch(getListFilterHistory(token,search))
   // }

   const handleDelete = (id)=>{
      const token = window.localStorage.getItem('token');
      dispatch(deleteHistory(token,id));
      setControl(true);
   };
    
   const handleButton = (i) =>{
      setShow(i);
   };

      
   const handleButtonLeave = () =>{
      setShow(-1);
   };

   return (
      <Layout>
         <section className="history container mb-5">
            <div className="row">
               <div className="col-lg-8 me-4">
                  <form onSubmit={handleFillter} className="search-filter mb-4">
                     <div className="d-flex position-relative">
                        <input className="form-control search-input" type="search" name="search" placeholder="Search history" aria-label="Search"/>
                        <button className="btn btn-search position-absolute" type="submit"><FaSearch/></button>
                     </div>
                     <div className="accordion mt-4" id="accordionExample">
                        <div className="accordion-item">
                           <h2 className="accordion-header" id="headingOne">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Filter
                              </button>
                           </h2>
                           <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                                 <form onSubmit={handleFillter}>
                                    <div className="mb-3">
                                       <select className="form-select" name = "category_id" aria-label="Default select example">
                                          <option value="" style={{display:'none'}}>Vehicle Type</option>
                                          <option value="1">Bike</option>
                                          <option value="2">Cars</option>
                                          <option value="3">Motorbike</option>
                                       </select>
                                    </div>
                                    <div className="mb-3">
                                       <select className="form-select" name="status_payment" aria-label="Default select example">
                                          <option value="" style={{display:'none'}}>Status</option>
                                          <option value="1">No Prepayment</option>
                                          <option value="7">Payment Success</option>
                                       </select>
                                    </div>
                                    <div className="mb-3">
                                       <input type="date" name="date" className='form-control' placeholder='Date'/>
                                    </div>
                                    <button className='button-filled mt-5'>Filter</button>
                                 </form>
                              </div>
                           </div>
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
                                 <div className={'row mb-3'} key={item.id} onMouseLeave={handleButtonLeave} onMouseEnter={()=>handleButton(i)}>
                                    <div className="col-xxl-9">
                                       <div className="row detail-order">
                                          <div className="col-md-4">
                                             <img src={item.photo} alt="motorbike"/>
                                          </div>
                                          <div className="col-md">
                                             <h5 className="card-title">{item.brand}</h5>
                                             <div className="date">{item.rentStartDate} - {item.rentEndDate}</div>
                                             <div className="prepayment">Payment : Rp. {item.prepayment.toLocaleString('id')}</div>
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
                              );
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
                           return(<div key={item.id} className="position-relative mb-3">
                              <img src={item.photo} alt="Car2"/>
                              <div className="text-title-vehicle ">
                                 <div className="vehicle-name">{item.name}</div>
                                 <div className="location">{item.location}</div>
                              </div>
                           </div>);
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
   );
};

export default History;
