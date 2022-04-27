import AxiosCostum from '../../helpers/AxiosCostum';


export const getListStatus = () => {
   return {
      type: 'GET_STATUS',
      payload: AxiosCostum().get('/status?limit=20')
   };
};
