/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export const Image = ({ children, photo, photoVarian, ...rest }) => {
   return ( 
      <img src = { photo } className = { photoVarian } {...rest }/>
   );
};

export default Image;