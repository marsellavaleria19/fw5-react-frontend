import AxiosCostum from '../../helpers/AxiosCostum';
import qs from 'qs';

export const getListLocation = () => {
   return {
      type: 'GET_LOCATION',
      payload: AxiosCostum().get('/locations?limit=20')
   };
};

export const addLocation = (token,data) =>{
   return {
      type:'DATA_LOCATION',
      payload : AxiosCostum(token).post('/locations',qs.stringify(data))
   };
};