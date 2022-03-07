import React, { Component,useEffect,useState } from 'react'
import {FaChevronRight} from 'react-icons/fa'
import {default as axios} from 'axios';
import Layout from '../component/Layout';
import { getListCategory } from '../redux/actions/category';
import { getListVehicle } from '../redux/actions/vehicle';
import { Link,useNavigate } from 'react-router-dom';
import { connect,useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Category = ()=> {
    const {category,vehicle} = useSelector(state=>state)
    const dispatch = useDispatch()
    const [listCategory,setListCategory] = useState([])
    const [listVehicle,setListVehicle] = useState([])
    const navigate = useNavigate();
    const {REACT_APP_URL,REACT_APP_LIMIT_CATEGORY} = process.env 

    useEffect(()=>{
        dispatch(getListCategory())
        dispatch(getListVehicle())
    },[]);

    return (
        <>
            <Layout>
                {
                    category.listCategory.length > 0 ? category.listCategory.map((itemCategory)=>{
                       return (
                        <section className="popular-town">
                            <div className="container">
                                <div className="row d-flex align-items-center header">
                                    <div className="col">
                                        <h1 className="section-title">{itemCategory.name}</h1>
                                    </div>
                                    <div className="col text-end">
                                        <Link className="section-link-view" to={`/category/${itemCategory.id}`}>View all<FaChevronRight/></Link>
                                    </div>
                                </div>
                                <div className="row text-center">
                                    {
                                       vehicle.listVehicle && vehicle.listVehicle.length > 0 && vehicle.listVehicle.filter(item=>item.category_id===itemCategory.id).filter((item,index)=>index<REACT_APP_LIMIT_CATEGORY).map((itemVehicle)=>{
                                        return(
                                            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                                <div class="d-inline-block position-relative">
                                                    <img src={itemVehicle.photo} className="img-fluid" alt="Car1" />
                                                        <div class="text-title-vehicle">
                                                            <div className="vehicle-name">{itemVehicle.name}</div>
                                                            <div className="location">{itemVehicle.location}</div>
                                                        </div>
                                                </div>
                                            </div>
                                        )
                                    })    
                                    }
                                </div>
                            </div>
                        </section>
                       )
                    }) : 
                    <div class="no-vehicle text-center">
                        There is no vehicle left
                    </div> 
                }
            </Layout>
      </>
    )
  }

  export default Category