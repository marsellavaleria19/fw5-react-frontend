/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import NavbarHomeSearch from './NavbarHomeSearch';
import Footer from './Footer';
import NavbarLogin from './NavbarLogin';
import { useSelector } from 'react-redux';

export const Layout  = (props) => {
   const auth = useSelector(state=>state.auth);
   return (
      <>
         {auth.token!==null ? <NavbarHomeSearch/> : <NavbarLogin/>}
         {props.children}
         <Footer/>
      </>
   );
};

export default Layout;
