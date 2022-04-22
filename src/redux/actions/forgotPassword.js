import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCostum';

export const forgotPasswordProcess = (email) => {
   const data = { 'email': email };
   return {
      type: 'FORGOT_PASSWORD',
      payload: AxiosCostum().post('/auth/forgotpassword', qs.stringify(data))
   };
};

export const confirmForgotPasswordProcess = (email, code, password, confirmPassword) => {
   const data = { 'email': email, 'code': code, 'password': password, 'confirmPassword': confirmPassword };
   console.log(data);
   return {
      type: 'CONFIRM_FORGOT_PASSWORD',
      payload: AxiosCostum().post('/auth/forgotpassword', qs.stringify(data))
   };
};