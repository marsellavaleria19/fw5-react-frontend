/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import NavbarHomeSearch from './NavbarHomeSearch';
import Footer from './Footer';
import NavbarLogin from './NavbarLogin';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PrivateRouter from '../routers/PrivateRouter';

export const Layout  = (props) => {
   const auth = useSelector(state=>state.auth);
   const navigate = useNavigate();
   useEffect(()=>{
      if(auth.isLogout==true){
         navigate('/');
      }
   },[auth.isLogout]);
 
   return (
      <>
         {auth.token!==null ? <NavbarHomeSearch/> : <NavbarLogin/>}
         {props.children}
         <Footer/>
      </>
   );
};

export default Layout;
