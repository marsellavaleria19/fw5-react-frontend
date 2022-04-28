import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCostum';

export const loginProcess = (email, password) => {
   const data = { 'email': email, 'password': password };
   return {
      type: 'LOGIN',
      payload: AxiosCostum().post('/auth/login', qs.stringify(data))
   };
};

export const getDataUser = (token) => {
   return {
      type: 'LOGIN_PROFILE',
      payload: AxiosCostum(token).get('/profile')
   };
};

export const changePasswordProcess = (dataSend,token) => {
   const data = { 'password':dataSend.password , 'newPassword': dataSend['new password'],'confirmNewPassword':dataSend['confirm new password'] };
   return {
      type: 'CHANGE_PASSWORD',
      payload: AxiosCostum(token).post('/auth/changepassword', qs.stringify(data))
   };
};