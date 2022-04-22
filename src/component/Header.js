/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { useSelector } from 'react-redux';

export const Header = ()=> {
   const {auth} = useSelector(state=>state);

   const [filledForms,setFilledForms] = useState(['category_id','location','payment_id','date']);
   const navigate = useNavigate();
 
   const handleFilter = (event)=>{
      event.preventDefault();
      const url = ()=>{
         var result = '';
         filledForms.forEach((item)=>{
            if(event.target.elements[item].value){
               if(result==''){
                  result = `${item}=${event.target.elements[item].value}`;
               }else{
                  result+=`&${item}=${event.target.elements[item].value}`;
               }
            }
         });
         return `/search?${result}`;
      };
      navigate(url(),{replace:true});
   };

   return (
      <header>
         <div className="jumbotron">
            <div className="content">
               <div className="container">
                  <h1 className="heading">Explore and Travel</h1>
                  <p>Vehicle Finder</p>
                  <div className="line"></div>
                  <form onSubmit={handleFilter} className="filter-homepage">
                     <div className="d-md-flex flex-md-wrap mb-md-4">
                        <Select name="location" selectVarian="me-4 mb-3" aria-label="Default select example"> 
                           <option value="" style={{display:'none'}}>Location</option>
                           <option value="Yogyakarta">Yogyakarta</option>
                           <option value="Bandung">Bandung</option>
                        </Select>
                        <Select name="category_id" selectVarian="mb-3" aria-label="Default select example">
                           <option value="" style={{display:'none'}}>Type</option>
                           <option value="1">Bike</option>
                           <option value="2">Cars</option>
                           <option value="3">Motorbike</option>
                        </Select>
                     </div>
                     <div className="d-md-flex flex-md-wrap">
                        <Select name="payment_id" selectVarian="me-4 mb-3" aria-label="Default select example">
                           <option value="" style={{display:'none'}}>Payment</option>
                           <option value="1">Cash</option>
                           <option value="2">Transfer</option>
                        </Select>
                        <Input typeInput="date" name="date"/>
                     </div>
                     <Button btnVarian="button-filled" type="submit">Explore</Button>
                     {/* <button className="button-filled">Explore</button> */}
                  </form>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
