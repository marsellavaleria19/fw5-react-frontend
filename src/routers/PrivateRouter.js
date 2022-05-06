/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRouter = ({children,token=null})=>{
   console.log(token);
   if(token!==null){
      return children;  
   }
   else{
      return <Navigate to="/login" />;
   }
};

export default PrivateRouter;

