import React, { Component, useState,useEffect } from 'react'
import Layout from '../component/Layout'
import {default as axios} from 'axios'
import {useSearchParams } from 'react-router-dom';
import { getListSearchFilter } from '../redux/actions/search';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { useDispatch, useSelector } from 'react-redux';

export  const Search = ()=> {
    const {search} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [listSearch,setListSearch] = useState([])
    const [page,setPage] = useState([])
    const [searchParams,setSearchParams] = useSearchParams()
    const [dataSearch,setDataSearch] = useState({})
    const [filledParams,setFilledParams] = useState(['category_id','location','payment_id','name','date'])
    const [filledForms,setFilledForms] = useState(['category_id','location','payment_id','date'])
    const [resultFillter,setResultFillter] = useState("")

    useEffect(()=>{
        filledParams.forEach((item)=>{
            if(searchParams.get(item)){
                dataSearch[item] = searchParams.get(item)
            }
        })
        dispatch(getListSearchFilter(dataSearch))
     },[]);

     useEffect(()=>{
        if(!dataSearch[filledParams[3]]){
            if(searchParams.get(filledParams[3])){
                dataSearch[filledParams[3]] = searchParams.get(filledParams[3])
                setSearchParams(dataSearch)
                dispatch(getListSearchFilter(dataSearch))
            }
        }else if(dataSearch[filledParams[3]]!==searchParams.get(filledParams[3])){
            dataSearch[filledParams[3]] = searchParams.get(filledParams[3])
            if(searchParams.get(filledParams[3])){
                dataSearch[filledParams[3]] = searchParams.get(filledParams[3])
                setSearchParams(dataSearch)
                dispatch(getListSearchFilter(dataSearch))
            }
        }
     });

     const handleFillter = async(event)=>{
        event.preventDefault();
          filledForms.forEach((item)=>{
            if(event.target.elements[item].value){
                dataSearch[item] = event.target.elements[item].value
            }
        })
        setSearchParams(dataSearch)
        // getDataSearch(dataSearch);
        dispatch(getListSearchFilter(dataSearch))
    }

    const handleSort = async(event)=>{
        event.preventDefault();
        if(event.target.value=="PriceHigh"){
            dataSearch.sort = "price"
            dataSearch.order = "desc"
        }
        else if(event.target.value=="PriceLow"){
            dataSearch.sort = "price"
            dataSearch.order = "asc"
        }
        setSearchParams(dataSearch);
        // getListSearchFilter(dataSearch)
        dispatch(getListSearchFilter(dataSearch))
    }

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
                        <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Filter
                            </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <form onSubmit={handleFillter}>
                                        <div className="mb-3">
                                            <select class="form-select" name="location" aria-label="Default select example">
                                                <option value="" style={{display:'none'}}>Location</option>
                                                <option value="Bandung">Bandung</option>
                                                <option value="Jakarta">Jakarta</option>
                                                <option value="Yogyakarta">Yogyakarta</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select class="form-select" name = "category_id" aria-label="Default select example">
                                                <option value="" style={{display:'none'}}>Tipe</option>
                                                <option value="1">Bike</option>
                                                <option value="2">Cars</option>
                                                <option value="3">Motorbike</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select class="form-select" name="payment_id" aria-label="Default select example">
                                                <option value="" style={{display:'none'}}>Payment</option>
                                                <option value="1">Cash</option>
                                                <option value="2">Transfer</option>
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
                    {
                        
                        !search.isError ?
                        search.listSearch.length > 0 ? search.listSearch.map((item)=>{
                            return(
                                <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                <div class="card">
                                    <img src={item.photo} class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">{item.name}</h5>
                                        <div class="card-text">Location : {item.location}</div>
                                        <div class="card-text">Type : {item.category}</div>
                                        <div class="card-text">Price : {item.price}</div>
                                        <div class="card-text">Payment Type: {item.payment == null ? "-" : item.payment}</div>
                                        <div class="card-text">Rent date : {item.rentStartDate == null && item.rentEndDate==null ? "-" : `${item.rentStartDate}-${item.rentEndDate}`}</div>
                                    </div>
                                </div>
                            </div>
                            )
                        }) : 
                        <div className="no-vehicle text-center">
                            There is no vehicle left
                         </div> 
                         :
                         <div className="no-vehicle text-center">
                             {search.errMessage}
                        </div> 
                    }
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
    )
}

export default Search
