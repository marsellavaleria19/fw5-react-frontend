/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import {FaChevronRight} from 'react-icons/fa';
import Layout from '../component/Layout';
import { getListVehicleByCategory } from '../redux/actions/vehicle';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ListVehicleComponent from '../component/ListVehicleComponent';

export const Category = ()=> {
   const {category,vehicle} = useSelector(state=>state);
   const dispatch = useDispatch();
   const {REACT_APP_LIMIT_CATEGORY} = process.env; 

   useEffect(()=>{
      dispatch({
         type : 'CLEAR_VEHICLE'
      });
      category.listCategory.length > 0 && category.listCategory.map((itemCategory)=>{
         dispatch(getListVehicleByCategory(itemCategory.id,REACT_APP_LIMIT_CATEGORY));
      });
   },[]);
 
   return (
      <Layout>
         {
            category.listCategory.length > 0 ? category.listCategory.map((itemCategory)=>{
               return (
                  <section key={itemCategory.id} className="popular-town">
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
                                    <ListVehicleComponent key={item.id} name={item.name} location={item.location} photo={item.photo}/>
                                 );
                              }) :
                                 <div className="no-vehicle text-center">
                                      There is no vehicle left
                                 </div> 
                           }
                           {/* <ListVehicleComponent category={itemCategory} list={listCategoryVehicle}/> */}
                        </div>
                     </div>
                  </section>
               );
            }) : 
               <div className="no-vehicle text-center">
                        There is no vehicle left
               </div> 
         }
      </Layout>
   );
};

export default Category;