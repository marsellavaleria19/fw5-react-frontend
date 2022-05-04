import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCostum';

export const forgotPasswordProcess = (email) => {
   const data = { 'email': email };
   return {
      type: 'FORGOT_PASSWORD',
      payload: AxiosCostum().post('/auth/forgotpassword', qs.stringify(data))
   };
};

export const confirmForgotPasswordProcess = (dataSend) => {
   const data = { 'email': dataSend.email, 'code': dataSend.code, 'password': dataSend.password, 'confirmPassword': dataSend['confirm password']};
   console.log(data);
   return {
      type: 'CONFIRM_FORGOT_PASSWORD',
      payload: AxiosCostum().post('/auth/forgotpassword', qs.stringify(data))
   };
};