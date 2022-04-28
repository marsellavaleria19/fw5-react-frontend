import qs from 'qs';
import AxiosCostum from '../../helpers/AxiosCostum';
import moment from 'moment';

export const saveDataReservation = (reservation, token) => {
   console.log(token);
   var rentStartDate = new Date(reservation.date);
   var rentEndDate = null;
   var day = parseInt(reservation.day);
   var tempDay = 0;
   if (day == 1) {
      rentEndDate = rentStartDate;
   } else {
      day = day - 1;
      tempDay = rentStartDate.getDate() + parseInt(day);
      rentEndDate = new Date(new Date().setDate(tempDay));
   }
   var data = {};
   data.qty = reservation.qty;
   data.idVehicle = reservation.vehicle;
   data.idUser = reservation.user.id;
   data.fullname = reservation.user.fullName;
   data.mobilePhone = reservation.user.mobileNumber;
   data.emailAddress = reservation.user.email;
   data.startRentDate = moment(rentStartDate).format('YYYY-MM-DD');
   data.endRentDate = moment(rentEndDate).format('YYYY-MM-DD');
   data.status = 6;
   data.idCard = null;
   data.prepayment = 0;
   data.location = reservation.user.address;
   data.payment_id = null;
   return {
      type: 'RESERVATION',
      payload: AxiosCostum(token).post('/histories', qs.stringify(data))
   };
};

export const addDataReservation = (data) => {
   return {
      type: 'DATA_RESERVATION',
      payload: data
   };
};

export const getDetailReservation = (id) => {
   return {
      type: 'RESERVATION',
      payload: AxiosCostum().get(`/histories/${id}`)
   };
};