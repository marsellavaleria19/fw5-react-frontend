/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Image from './Image';
import Button from '../component/Button';
import {FaTrashAlt} from 'react-icons/fa';

export const ListVehicleComponent = ({children,name,location,hover,photo,...rest}) => {
   const [show,setShow] = useState(-1);
   return (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4" {...rest}>
         <div className="d-inline-block position-relative">
            <Image photo={photo} photoVarian="img-fluid" alt={`${name}`} />
            <div className="text-title-vehicle">
               <div className="vehicle-name">{name}</div>
               <div className="location">{location}</div>
            </div>
         </div>
      </div>
   );
};

export default ListVehicleComponent;