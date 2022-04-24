import AxiosCostum from '../../helpers/AxiosCostum';


export const getListLocation = () => {
   return {
      type: 'GET_LOCATION',
      payload: AxiosCostum().get('/locations?limit=20')
   };
};
