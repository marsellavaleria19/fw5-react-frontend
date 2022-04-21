import React, { Component,useEffect,useState } from 'react'
import {FaChevronRight} from 'react-icons/fa'
import {default as axios} from 'axios';
import Layout from '../component/Layout';
import { getListCategory } from '../redux/actions/category';
import { getListVehicle,getListVehicleByCategory } from '../redux/actions/vehicle';
import { Link,useNavigate } from 'react-router-dom';
import { connect,useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ListVehicleComponent from '../component/ListVehicleComponent';

export const Category = ()=> {
    const {category,vehicle} = useSelector(state=>state)
    const dispatch = useDispatch()
    var [listCategoryVehicle,setListCategoryVehicle] = useState([])
    const [listVehicle,setListVehicle] = useState([])
    const navigate = useNavigate();
    const {REACT_APP_URL,REACT_APP_LIMIT_CATEGORY} = process.env 

    useEffect(()=>{
       dispatch({
          type : 'CLEAR_VEHICLE'
       })
      category.listCategory.length > 0 && category.listCategory.map((itemCategory)=>{
         dispatch(getListVehicleByCategory(itemCategory.id,REACT_APP_LIMIT_CATEGORY));
      })
    },[]);

  

//     useEffect(()=>{
//       if(category.listCategory.length > 0){
//         getDataListVehicle();
//       }
//        // dispatch(getListVehicleWithCategory());
//       // dispatch(getListVehicle())
//   },[category.listCategory]);

   //  const getDataListVehicle = ()=>{
   //          category.listCategory.forEach(async(item)=>{
   //             const dataVehicle = await dispatch(getListVehicleByCategory(item.id));
   //             const dataCategoryVehicle = {category:item,dataVehicle:dataVehicle.value.data.result};
   //             listCategoryVehicle = [...listCategoryVehicle,...[dataCategoryVehicle]];
   //           })
   //           setListCategoryVehicle(listCategoryVehicle);
   // }

   const getDataListVehicle = async(itemCategory)=>{
      const dataVehicle = getListVehicleByCategory(itemCategory.id);
      // const dataCategoryVehicle = {category:item,dataVehicle:dataVehicle.value.data.result};
      return dataVehicle;   
   }
 
    return (
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
                                      vehicle.listAllVehicle.length > 0 ? vehicle.listAllVehicle.filter((item)=>item.category_id==itemCategory.id).map((item)=>{
                                         return(
                                          <ListVehicleComponent item={item}/>
                                         )
                                      }) :
                                      <div class="no-vehicle text-center">
                                      There is no vehicle left
                                  </div> 
                                   }
                                    {/* <ListVehicleComponent category={itemCategory} list={listCategoryVehicle}/> */}
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
    )
  }

export default Category