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
      type: 'GET_DETAIL_VEHICLE',
      payload: AxiosCostum().get(`/vehicles/${id}`)
   };
};

export const getPopularVehicle = () =>{
   return {
      type:'GET_VEHICLE_POPULAR',
      payload : axios.get(`${REACT_APP_URL}/vehicles/popular?limit=4`)
   };
};

export const getDataVehicle = (data) =>{
   return{
      type : 'GET_DATA_VEHICLE',
      payload : data
   };
};

export const getDataVehiclePopular = () =>{
   return{
      type : 'GET_DATA_VEHICLE_POPULAR',
   };
};

export const addVehicle = (data,token,file=null) =>{
   const formData = new FormData();
   formData.append('name', data.name);
   formData.append('description', data.description);
   formData.append('location_id', data.location);
   formData.append('category_id', data.category);
   formData.append('qty', data.stock);
   formData.append('price', data.price);
   formData.append('isAvailable',data['is available']);
   if (file !== null) {
      formData.append('photo', file);
   }
   return {
      type:'ADD_VEHICLE',
      payload : AxiosCostum(token).post('/vehicles',formData)
   };
};

export const updateVehicle = (data,id,token,file=null) =>{
   const formData = new FormData();
   formData.append('name', data.name);
   formData.append('description', data.description);
   formData.append('location_id', data.location);
   formData.append('category_id', data.category);
   formData.append('qty', data.stock);
   formData.append('price', data.price);
   formData.append('isAvailable',data['is available']);
   if (file !== null) {
      formData.append('photo', file);
   }
   
   return {
      type:'UPDATE_VEHICLE',
      payload : AxiosCostum(token).patch(`/vehicles/${id}`,formData)
   };
};

export const deleteVehicle = (id,token) =>{
   return {
      type:'DELETE_VEHICLE',
      payload : AxiosCostum(token).delete(`/vehicles/${id}`)
   };
};

export const addFavoriteVehicle = (id,item) =>{
   return {
      type:'ADD_FAVORITE_VEHICLE',
      payload : {id,item}
   };
};

export const getListFavoriteVehicle = () =>{
   return {
      type:'FAVORITE_VEHICLE'
   };
};