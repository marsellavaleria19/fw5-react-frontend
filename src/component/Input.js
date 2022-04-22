/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export const Input = ({ children,typeInput,variantInput, ...rest }) => {
   return ( 
      <input type={`${typeInput}`} className={`form-control ${variantInput}`} {...rest }/>
   );
};

export default Input;