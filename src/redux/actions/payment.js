import AxiosCostum from '../../helpers/AxiosCostum';

export const paymentUpdate = (token, payment, paymentId, id) => {
   const param = new URLSearchParams();
   param.append('prepayment', payment);
   param.append('payment_id', paymentId);
   return {
      type: 'PAYMENT',
      payload: AxiosCostum(token).patch(`/histories/${id}`, param)
   };
};

export const paymentStatusUpdate = (token,id) => {
   const param = new URLSearchParams();
   param.append('status_id',2);
   return {
      type: 'PAYMENT',
      payload: AxiosCostum(token).patch(`/histories/${id}`, param)
   };
};

export const getListPaymentType = () => {
   return {
      type: 'GET_PAYMENT_TYPE',
      payload: AxiosCostum().get('/payment-types?limit=20')
   };
};

