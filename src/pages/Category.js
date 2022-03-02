import React, { Component,useEffect,useState } from 'react'
import {FaChevronRight} from 'react-icons/fa'
import {default as axios} from 'axios';
import Layout from '../component/Layout';
import { Link,useNavigate } from 'react-router-dom';

export const Category = ()=> {
    const [listCategory,setListCategory] = useState([])
    const [listVehicle,setListVehicle] = useState([])
    const navigate = useNavigate();
    const {REACT_APP_URL,REACT_APP_LIMIT_CATEGORY} = process.env 

    useEffect(()=>{
        getDataCategory()
        getDataVehicle()
    },[]);
    const getDataCategory = async()=>{
        const {data} = await axios.get(`${REACT_APP_URL}/categories`);
        setListCategory(data.results);
    }
    const getDataVehicle = async()=>{
        const {data} = await axios.get(`${REACT_APP_URL}/vehicles?limit=20`);
        setListVehicle(data.results);
    }

    const goToDetail = (id)=>{
        navigate(`/category/vehicle/${id}`)
    }

    return (
        <>
            <Layout>
                {
                    listCategory.map((itemCategory)=>{
                        return(
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
                                            listVehicle.filter(item=>item.category_id===itemCategory.id).filter((item,index)=>index<REACT_APP_LIMIT_CATEGORY).map((itemVehicle)=>{
                                                return(
                                                    <div onClick={()=>goToDetail(itemVehicle.id)} className="col-sm-6 col-md-4 col-lg-3 mb-4">
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
                    })
                }
            </Layout>
            {/* <NavbarHomeSearch/>
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
            <Footer/> */}
      </>
    )
  }

  export default Category