import React, { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListVehicleByCategory } from '../redux/actions/vehicle'

export const ListVehicleComponent = ({children,item,...rest}) => {
   
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
               <div class="d-inline-block position-relative">
                  <img src={item.photo} className="img-fluid" alt="Car1" />
                     <div class="text-title-vehicle">
                           <div className="vehicle-name">{item.name}</div>
                           <div className="location">{item.location}</div>
                     </div>
               </div>
            </div>
      )
}

export default ListVehicleComponent