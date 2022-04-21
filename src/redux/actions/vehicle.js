import { default as axios } from 'axios';
import AxiosCostum from '../../helpers/AxiosCostum';

// eslint-disable-next-line no-undef
const { REACT_APP_URL } = process.env;

export const getListVehicle = () => {
   return {
      type: 'GET_VEHICLE',
      payload: axios.get(`${REACT_APP_URL}/vehicles?limit=20`)
   };
};

export const getListVehicleByMonth = () => {
   var month = new Date().getMonth();
   console.log(month);
   return {
      type: 'GET_VEHICLE',
      payload: axios.get(`${REACT_APP_URL}/vehicles?month=${month}&limit=3`)
   };
};

export const getListVehicleByCategory = (idCategory,limit) => {
   return {
      type: 'GET_VEHICLE',
      payload: AxiosCostum().get(`/vehicles/category/${idCategory}?limit=${limit}`)
   };
};

export const getListVehicleByUrl = (url) => {
   return {
      type: 'GET_VEHICLE_NEXT',
      payload: axios.get(`${url}`)
   };
};

export const getDetailVehicle = (id) => {
   return {
      type: 'GET_VEHICLE',
      payload: axios.get(`${REACT_APP_URL}/vehicles/${id}`)
   };
};

export const getPopularVehicle = () =>{
   return {
      type:'GET_VEHICLE_POPULAR',
      payload : axios.get(`${REACT_APP_URL}/vehicles/popular?limit=4`)
   };
};