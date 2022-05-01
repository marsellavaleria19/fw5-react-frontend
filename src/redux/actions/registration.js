import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCostum';

export const registrationProcess = (dataSend) => {
   const data = { 'fullName': dataSend.name, 'username': dataSend.username, 'email': dataSend.email,'mobileNumber':dataSend['mobile number'],'password': dataSend.password };
   return {
      type: 'REGISTER',
      payload: AxiosCostum().post('/auth/register', qs.stringify(data))
   };
};

export const verifyEmailProcess = (dataSend) => {
   const data = { 'email': dataSend.email};
   return {
      type: 'VERIFY_USER_EMAIL',
      payload: AxiosCostum().post('/auth/emailverification', qs.stringify(data))
   };
};

export const confirmVerifyProcess = (dataSend) => {
   const data = { 'email': dataSend.email, 'password': dataSend.password, 'code': dataSend.code };
   return {
      type: 'VERIFY_USER',
      payload: AxiosCostum().post('/auth/emailverification', qs.stringify(data))
   };
};

// export const verifyProcess = (email, password, code) => {
//    const data = { 'email': email, 'password': password, 'code': code };
//    return {
//       type: 'VERIFY_USER',
//       payload: AxiosCostum().post('/auth/emailverification', qs.stringify(data))
//    };
// };