/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {  } from 'react';
import Image from './Image';

export const ListVehicleComponent = ({children,name,location,photo,...rest}) => {
   
   return (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
         <div className="d-inline-block position-relative">
            <Image photo={photo} photoVarian="img-fluid img-vehicle" alt={`${name}`} />
            <div className="text-title-vehicle">
               <div className="vehicle-name">{name}</div>
               <div className="location">{location}</div>
            </div>
         </div>
      </div>
   );
};

export default ListVehicleComponent;