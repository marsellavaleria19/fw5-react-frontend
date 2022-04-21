/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {  } from 'react';

export const ListVehicleComponent = ({children,item,...rest}) => {
   
   return (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
         <div className="d-inline-block position-relative">
            <img src={item.photo} className="img-fluid" alt="Car1" />
            <div className="text-title-vehicle">
               <div className="vehicle-name">{item.name}</div>
               <div className="location">{item.location}</div>
            </div>
         </div>
      </div>
   );
};

export default ListVehicleComponent;