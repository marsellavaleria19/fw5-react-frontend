import AxiosCostum from '../../helpers/AxiosCostum';
import qs from 'qs';

export const getListCategory = () => {
   return {
      type: 'GET_CATEGORY',
      payload: AxiosCostum().get('/categories?limit=20')
   };
};

export const getDetailCategory = (id) => {
   return {
      type: 'GET_DETAIL_CATEGORY',
      payload: AxiosCostum().get((`/categories/${id}`))
   };
};

export const getDataCategory = (category) =>{
   return{
      type : 'GET_DATA_CATEGORY',
      payload : category
   };
};

export const addCategory = (token,dataSend) =>{
   const data = {
      name : dataSend.category
   };
   return {
      type:'ADD_CATEGORY',
      payload : AxiosCostum(token).post('/categories',qs.stringify(data))
   };
};