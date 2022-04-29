/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import NavbarHome from './NavbarHome';
import Footer from './Footer';
import NavbarLogin from './NavbarLogin';
import { useSelector } from 'react-redux';

export const LayoutProfile  = (props) => {
   const auth = useSelector(state=>state.auth);
   return (
      <>
         <NavbarHome/>
         {props.children}
         <Footer/>
      </>
   );
};

export default LayoutProfile;
