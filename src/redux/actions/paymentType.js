import AxiosCostum from '../../helpers/AxiosCostum';


export const getListPaymentType = () => {
   return {
      type: 'GET_PAYMENT_TYPE',
      payload: AxiosCostum().get('/payment-types?limit=20')
   };
};
