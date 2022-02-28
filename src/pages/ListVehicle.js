import React, { Component,useEffect,useState } from 'react'
import NavbarHomeSearch from '../component/NavbarHomeSearch'
import Footer from '../component/Footer';
import imgPopular1 from '../assets/images/popular1.png';
import imgPopular2 from '../assets/images/popular2.png';
import imgPopular3 from '../assets/images/popular3.png';
import imgPopular4 from '../assets/images/popular4.png';
import imgCar2 from '../assets/images/car2.png';
import imgCar4 from '../assets/images/car4.png';
import imgMotorBike1 from '../assets/images/motorbike1.png';
import imgMotorBike3 from '../assets/images/motorbike3.png';
import imgBike1 from '../assets/images/bike1.png';
import imgBike2 from '../assets/images/bike2.png';
import imgBike3 from '../assets/images/bike3.png';
import imgBike4 from '../assets/images/bike4.png';
import Layout from '../component/Layout';
import {default as axios} from 'axios';
import { useNavigate, useParams,useSearchParams } from 'react-router-dom';
import { FaAngleDoubleDown } from 'react-icons/fa'

export const ListVehicle = ()=> {
    const [dataCategory,setDataCategory] = useState({})
    const [listVehicle,setListVehicle] = useState([])
    const [page,setPage] = useState([])
    const [searchParams,setSearchParams] = useSearchParams()
    const [vehicle,setVehicle] = useState("");
    const {id} = useParams()
    useEffect(()=>{
       if(id){
            getDataCategory();
            getListVehicle();
       }else{
        if(searchParams.get('search')){
            getDataSearch(searchParams.get('search'))
        }
       }
    },[]);

    useEffect(()=>{
        console.log(listVehicle)
    //    if(vehicle){
           if(vehicle!==searchParams.get('search')){
             setVehicle(searchParams.get('search'))
             if(searchParams.get('search')){
                getDataSearch(searchParams.get('search'))
            }
           }
    //    }
    })

    const navigate = useNavigate();
    
    const goToDetail = (id)=>{
        navigate(`/category/vehicle/${id}`)
    }

    const getDataCategory = async()=>{
        const {data} = await axios.get(`http://localhost:5000/categories/${id}`);
        setDataCategory(data.results);
    }

    const getDataSearch = async(search)=>{
        const {data} = await axios.get(`http://localhost:5000/vehicles?search=${search}`);
        setListVehicle(data.results);
        setPage(data.pageInfo);
    }

    const getNextData = async(url)=>{
      console.log(url);
      const {data} = await axios.get(url);
      console.log(data)
      setListVehicle([...listVehicle,...data.results])
    //   if(searchParams.get('search')==null){
    //     setListVehicle([...listVehicle,...data.results])
    //   }else{
    //       setListVehicle(data.results)
    //   }
      setPage(data.pageInfo)
    }


    const getListVehicle = async()=>{
        const {data} = await axios.get(`http://localhost:5000/vehicles/category/${id}?limit=16`);
        setListVehicle(data.results);
        setPage(data.pageInfo);
    }
    return (
     <>
        <Layout>
            <section className="popular-town">
                <div className="container">
            {
                listVehicle.length > 0  ? 
                    <>
                        <div class="title">
                            {
                                Object.keys(dataCategory).length > 0 &&  <h1 class="section-title mb-2">{dataCategory.name}</h1>
                            }
                            
                            <div class="info text-center mb-5">Click item to see details and reservation</div>
                        </div>
                        <div className="row text-center">
                            {
                                listVehicle.map((item)=>{
                                    return(
                                        <div  key={String(item.id)} onClick={()=>goToDetail(item.id)} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                            <div class="d-inline-block position-relative">
                                                <img src={item.photo} className="img-fluid" alt="Popular1" />
                                                <div class="text-title-vehicle">
                                                    <div class="vehicle-name">{item.name}</div>
                                                    <div class="location">{item.location}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            page.next!==null ? 
                            <div className='text-center mt-5 mb-5'>
                                <button onClick={()=>getNextData(page.next)} className='btn btn-next'>Load more <FaAngleDoubleDown/></button>
                            </div> : ""
                        }
                    </>   
                       : 
                    <div class="no-vehicle text-center">
                        There is no vehicle left
                    </div> 
            //    listVehicle.map((item)=>{
            //         if(item!==null){
            //             return(
            //                 <section className="popular-town">
            //                     <div className="container">
            //                         <div class="title">
            //                             <h1 class="section-title mb-2">{item.category}</h1>
            //                             <div class="info text-center mb-5">Click item to see details and reservation</div>
            //                         </div>
            //                         <div className="row text-center">
            //                             <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            //                                 <div class="d-inline-block position-relative">
            //                                     <img src={item.photo} alt="Popular1" />
            //                                     <div class="text-title-vehicle">
            //                                         <div class="vehicle-name">{item.name}</div>
            //                                         <div class="location">{item.location}</div>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </section>
            //             )
            //        }else{
            //          return(
            //             <div class="no-vehicle text-center">
            //                 There is no vehicle left
            //             </div> 
            //          )
            //        }
            //    })
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
    )
}

export default ListVehicle