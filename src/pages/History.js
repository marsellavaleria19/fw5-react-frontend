/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {FaAngleRight} from 'react-icons/fa';
import Layout from '../component/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory,getListHistoryByUserId,deleteHistory,getListHistoryFilter, getListHistoryFilterByUserId } from '../redux/actions/history';
import { getListVehicleByMonth } from '../redux/actions/vehicle';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {Animated} from 'react-animated-css';
import Button from '../component/Button';
import NotFound from '../component/NotFound';
import moment from 'moment';


export const History  = ()=> {

   const {history,vehicle,auth,category,status} = useSelector(state=>state);
   const [searchParams,setSearchParams] = useSearchParams();
   const [isDelete,setIsDelete] = useState();
   const {id} = useParams();
   const [control,setControl] = useState(false);
   const dispatch = useDispatch();
   const [listHistory,setListHistory] = useState([]);
   const [show,setShow] = useState(-1);
   const [filledParams,setFilledParams] = useState(['category_id','status_id','date']);
   const [dataSearch,setDataSearch] = useState({});
   
   useEffect(()=>{
      if(auth?.user!==null){
         if(auth.user.role=='admin'){
            dispatch(getListHistory(auth.token));
         }else{
            dispatch(getListHistoryByUserId(auth.token,auth.user.id));
         }
      }
   },[]);

   useEffect(()=>{
      if(history.listHistory.length > 0 && control==true){
         setListHistory(history.listHistory);
      }
   },[history.listHistory]);

   const handleSearch = (event)=>{
      event.preventDefault();
      dataSearch['search'] = event.target.elements['search'].value;
      setSearchParams(dataSearch);
      handleSearchFilter(dataSearch);
   };

   const handleFillter = (event)=>{
      event.preventDefault();
      filledParams.forEach((item)=>{
         if(event.target.elements[item].value){
            dataSearch[item] = event.target.elements[item].value;
         }
      });
      handleSearchFilter(dataSearch);
   };

   const handleSearchFilter = (dataSearch)=>{
      setSearchParams(dataSearch);
      if(auth.user.role=='admin'){
         dispatch(getListHistoryFilter(dataSearch));
      }else{
         dispatch(getListHistoryFilterByUserId(dataSearch,auth.user.id,auth.token));
      }
      setControl(true);
   };

   const handleReset = (event)=>{
      event.preventDefault();
      document.getElementById('form-search').reset();
      document.getElementById('form-filter').reset();
      setSearchParams({});
      setDataSearch({});
      if(auth.user.role=='admin'){
         dispatch(getListHistoryFilter(dataSearch,auth.token));
      }else{
         dispatch(getListHistoryFilterByUserId('',auth.user.id,auth.token));
      }
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
               <div className="col-lg me-4">
                  <form onSubmit={handleSearch} id="form-search" className="search-filter mb-4">
                     <div className="d-flex position-relative">
                        <input className="form-control search-input" type="search" name="search" placeholder="Search history" aria-label="Search"/>
                        <button className="btn btn-search position-absolute" type="submit"><FaSearch/></button>
                     </div>
                  </form>
                  <div className="accordion mt-4" id="accordionExample">
                     <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                           <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Filter
                           </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                           <div className="accordion-body">
                              <form onSubmit={handleFillter} id="form-filter">
                                 <div className="mb-3">
                                    <select className="form-select" name = "category_id" aria-label="Default select example">
                                       <option value="" style={{display:'none'}}>Vehicle Type</option>
                                       {
                                          category.listCategory.length > 0 && category.listCategory.map((item)=>{
                                             return(
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                             );
                                          })
                                       }
                                    </select>
                                 </div>
                                 <div className="mb-3">
                                    <select className="form-select" name="status_id" aria-label="Default select example">
                                       <option value="" style={{display:'none'}}>Status</option>
                                       {
                                          status.listStatus.length > 0 && status.listStatus.map((item)=>{
                                             return(
                                                <option key={item.id} value={item.id}>{item.status}</option>
                                             );
                                          })
                                       }
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
                  <div className='mt-3'>
                     <Button btnVarian={'button-filled w-100 fs-4'} onClick={handleReset}>Reset</Button>
                  </div>
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
                           history.listHistory.length>0 ? history.listHistory.map((item,i)=>{
                              return(
                                 <div className={'d-md-flex justify-content-between mb-3'} key={item.id} onMouseLeave={handleButtonLeave} onMouseEnter={()=>handleButton(i)}>
                                    <div className="list-item">
                                       <div className="d-flex detail-order">
                                          <img src={item.photo} alt="motorbike"/>
                                          <div className='ms-3'>
                                             <h5 className="card-title">{item.brand}</h5>
                                             <div className="date">{moment(item.rentStartDate).format('DD MMM YYYY')} - {moment(item.rentEndDate).format('DD MMM YYYY')}</div>
                                             <div className="prepayment">Payment : Rp. {item.prepayment.toLocaleString('id')}</div>
                                             <div className="status">{item.status}</div>
                                          </div>
                                       </div>
                                    </div>
                                    <div>
                                       {
                                          show==i && 
                                          <Animated animationIn='fadeIn' animationOut='fadeOut'>
                                             <Button btnVarian="button-filled" onClick={()=>handleDelete(item.id)}>Delete</Button>  
                                          </Animated>
                                       }
                                    </div>    
                                 </div>
                              );
                           }) :
                              <NotFound/>
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
               <div className="col-lg-4 new-arrival">
                  <div className="d-flex flex-column align-items-center">
                     <div className="title">New Arrival</div>
                     {
                        vehicle.listVehiclepopular.length > 0 && vehicle.listVehiclepopular.map((item)=>{
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
