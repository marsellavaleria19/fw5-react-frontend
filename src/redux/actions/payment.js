import AxiosCostum from '../../helpers/AxiosCostum';

export const paymentUpdate = (token, payment, paymentId, id) => {
   const param = new URLSearchParams();
   param.append('prepayment', payment);
   param.append('payment_id', paymentId);
   param.append('status_id', 2);
   return {
      type: 'PAYMENT',
      payload: AxiosCostum(token).patch(`/histories/${id}`, param)
   };
};