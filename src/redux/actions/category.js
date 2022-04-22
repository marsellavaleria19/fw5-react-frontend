import AxiosCostum from '../../helpers/AxiosCostum';


export const getListCategory = () => {
   return {
      type: 'GET_CATEGORY',
      payload: AxiosCostum().get('/categories?limit=20')
   };
};

export const getDetailCategory = (id) => {
   return {
      type: 'GET_CATEGORY',
      payload: AxiosCostum().get((`/categories/${id}`))
   };
};