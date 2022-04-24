/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react';
import Layout from '../component/Layout';
import {useSearchParams } from 'react-router-dom';
import { getListSearchFilter } from '../redux/actions/search';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import SkeletonComponent from '../component/SkeletonComponent';
import Image from '../component/Image';

export  const Search = ()=> {
   const {search,location,category,payment} = useSelector(state=>state);
   const dispatch = useDispatch();
   const [searchParams,setSearchParams] = useSearchParams();
   const [dataSearch,setDataSearch] = useState({});
   const [filledParams,setFilledParams] = useState(['category_id','location_id','payment_id','name','date']);
   const [filledForms,setFilledForms] = useState(['category_id','location_id','payment_id','date']);
   const {REACT_APP_LIMIT_CATEGORY} = process.env; 

   const navigate = useNavigate();
  
   useEffect(()=>{
      filledParams.forEach((item)=>{
         if(searchParams.get(item)){
            dataSearch[item] = searchParams.get(item);
         }
      });
      dispatch(getListSearchFilter(dataSearch));
   },[]);

   useEffect(()=>{
      if(!dataSearch[filledParams[3]]){
         if(searchParams.get(filledParams[3])){
            dataSearch[filledParams[3]] = searchParams.get(filledParams[3]);
            setSearchParams(dataSearch);
            dispatch(getListSearchFilter(dataSearch));
         }
      }else if(dataSearch[filledParams[3]]!==searchParams.get(filledParams[3])){
         dataSearch[filledParams[3]] = searchParams.get(filledParams[3]);
         if(searchParams.get(filledParams[3])){
            dataSearch[filledParams[3]] = searchParams.get(filledParams[3]);
            setSearchParams(dataSearch);
            dispatch(getListSearchFilter(dataSearch));
         }
      }
   });

   const handleFillter = async(event)=>{
      event.preventDefault();
      filledForms.forEach((item)=>{
         if(event.target.elements[item].value){
            dataSearch[item] = event.target.elements[item].value;
         }
      });
      setSearchParams(dataSearch);
      // getDataSearch(dataSearch);
      dispatch(getListSearchFilter(dataSearch));
   };

   const handleSort = async(event)=>{
      event.preventDefault();
      if(event.target.value=='PriceHigh'){
         dataSearch.sort = 'price';
         dataSearch.order = 'desc';
      }
      else if(event.target.value=='PriceLow'){
         dataSearch.sort = 'price';
         dataSearch.order = 'asc';
      }
      setSearchParams(dataSearch);
      // getListSearchFilter(dataSearch)
      dispatch(getListSearchFilter(dataSearch));
   };

   const handleReset = (event)=>{
      event.preventDefault();
      document.getElementById('form-filter').reset();
      setSearchParams({});
      setDataSearch({});
      dispatch(getListSearchFilter(''));
   };

   const goToDetail = (id)=>{
      navigate(`/category/vehicle/${id}`);
   };

   // const getDataSearch = async(dataSearch)=>{
   //     const url = (dataSearch)=>{
   //         var result = "";
   //         filledParams.forEach((item)=>{
   //             if(dataSearch[item]){
   //                 if(result==""){
   //                     result = `${item}=${dataSearch[item]}`;
   //                 }else{
   //                     result+=`&${item}=${dataSearch[item]}`;
   //                 }
   //             }
   //         })
   //         if(dataSearch.sort){
   //             if(result==""){
   //                 result = `sort=${dataSearch.sort}&order=${dataSearch.order}`
   //             }else{
   //                 result += `&sort=${dataSearch.sort}&order=${dataSearch.order}`
   //             }
   //         }

   //         return `http://localhost:5000/search?${result}&limit=16`
   //     }
   //     const {data} = await axios.get(url(dataSearch));
   //     console.log(data)
   //     setListSearch(data.results);
   //     setPage(data.pageInfo);
   // }


   return (
      <Layout>
         <div className="search container">
            <div className="row mb-5">
               <div className="col-md">
                  <div className="accordion" id="accordionExample">
                     <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                           <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Filter
                           </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                           <div className="accordion-body">
                              <form id="form-filter" onSubmit={handleFillter}>
                                 <div className="mb-3">
                                    <select className="form-select" name="location_id" aria-label="Default select example">
                                       <option value="" style={{display:'none'}}>Location</option>
                                       {
                                          location.listLocation.length > 0 && location.listLocation.map((item)=>{
                                             return (
                                                <option key={item.id} value={item.id}>{item.location}</option>
                                             );
                                          })
                                       }
                                       
                                    </select>
                                 </div>
                                 <div className="mb-3">
                                    <select className="form-select" name = "category_id" aria-label="Default select example">
                                       <option value="" style={{display:'none'}}>Tipe</option>
                                       {
                                          category.listCategory.length > 0 && category.listCategory.map((item)=>{
                                             return (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                             );
                                          })
                                       }
                                    </select>
                                 </div>
                                 <div className="mb-3">
                                    <select className="form-select" name="payment_id" aria-label="Default select example">
                                       <option value="" style={{display:'none'}}>Payment</option>
                                       {
                                          payment.listPaymentType.length > 0 && payment.listPaymentType.map((item)=>{
                                             return (
                                                <option key={item.id} value={item.id}>{item.payment}</option>
                                             );
                                          })
                                       }
                                    </select>
                                 </div>
                                 <div className="mb-3">
                                    <input type="date" name="date" className='form-control' placeholder='Date'/>
                                 </div>
                                 <button className='button-filled mt-5'>Filter</button>
                                 <button className='button-filled mt-5 ms-3' onClick={handleReset}>Reset</button>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-md">
                  <select name="sort" className="form-select" aria-label="Default select example" onChange={handleSort}>
                     <option value="" style={{display:'none'}}>Sort By</option>
                     <option value="PriceHigh">Highest Price</option>
                     <option value="PriceLow">Lowest Price</option>
                  </select>
               </div>
            </div>
            <h2 className='mb-3'>Results : </h2>
               
            <div className="row mb-3">
               <section className="popular-town">
                  <div className="container">
                     {
                        <>
                           <div className="row text-center">
                              {
                                 !search.isLoading ?
                                    search.listSearch.length > 0 ? search.listSearch.map((item)=>{
                                       return(
                                          <div  key={String(item.id)} onClick={()=>goToDetail(item.id)} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                             <div className="d-inline-block position-relative">
                                                <Image photo={item.photo} photoVarian="img-fluid" alt={`${item.name}`} />
                                                <div className="text-title-vehicle">
                                                   <div className="vehicle-name">{item.brand}</div>
                                                   <div className="location">{item.location}</div>
                                                </div>
                                             </div>
                                          </div>
                                       // <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                       //    <div className="card">
                                       //       <img src={item.photo} className="card-img-top" alt="..."/>
                                       //       <div className="card-body">
                                       //          <h5 className="card-title">{item.name}</h5>
                                       //          <div className="card-text">Location : {item.location}</div>
                                       //          <div className="card-text">Type : {item.category}</div>
                                       //          <div className="card-text">Price : {item.price}</div>
                                       //          <div className="card-text">Payment Type: {item.payment == null ? '-' : item.payment}</div>
                                       //          <div className="card-text">Rent date : {item.rentStartDate == null && item.rentEndDate==null ? '-' : `${item.rentStartDate}-${item.rentEndDate}`}</div>
                                       //       </div>
                                       //    </div>
                                       // </div>
                                       );
                                    }) : 
                                       <div className="no-vehicle text-center">
                                              There is no vehicle left
                                       </div> 
                                    :
                                    <SkeletonComponent count={REACT_APP_LIMIT_CATEGORY}/> 
                              }
                           </div>
                           {/* {
                              vehicle.pageInfo.next!==null ? 
                                 <div className='text-center mt-5 mb-5'>
                                    <Button onClick={()=>getNextData(vehicle.pageInfo.next)} btnVarian='btn-next'>Load more <FaAngleDoubleDown/></Button>
                                 </div> : ''
                           } */}
                        </>   
                     }
                  </div>
               </section> 
            
               {/*               
                    <div className="col">
                        <div class="card">
                            <img src="..." class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card">
                            <img src="..." class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card">
                            <img src="..." class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div> */}
            </div>
         </div>
            
      </Layout>
   );
};

export default Search;
