import AxiosCostum from '../../helpers/AxiosCostum';

export const profileProcess = (id, data, file, token) => {
   const formData = new FormData();
   formData.append('email', data.email);
   formData.append('address', data.address);
   formData.append('gender', data.gender);
   formData.append('mobileNumber', data.mobileNumber);
   formData.append('nickName', data.nickName);
   formData.append('birthDate', data.birthDate);
   if (file !== null) {
      formData.append('photo', file);
   }
   return {
      type: 'PROFILE',
      payload: AxiosCostum(token).patch(`/users/${id}`, formData)
   };
};