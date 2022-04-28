const dataReservation = {
   dataReservation: null,
   isError: false,
   isLoading: false,
   isSuccess:false,
   message:null,
   errMessage: null,
};

const reservation = (state = dataReservation, action) => {
   switch (action.type) {
   case 'RESERVATION_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'RESERVATION_FULFILLED':
   {
      const { data } = action.payload;
      state.dataReservation = data.result;
      state.isLoading = false;
      state.message = data.message;
      state.isSuccess = true;
      state.isError = false;
      return {...state };
   }
   case 'RESERVATION_REJECTED':
   {
      const { data } = action.payload.response;
      state.isLoading = false;
      state.isError = true;
      state.isSuccess  = false;
      state.errMessage = data.message;
      return {...state };
   }
   case 'DATA_RESERVATION':
   {
      state.dataReservation = action.payload;
      state.isLoading = false;
      state.isError = false;
      return {...state };
   }
   case 'RESERVATION_MESSAGE_SUCCESS':
   {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message;
      return {...state};
   }
   case 'RESERVATION_MESSAGE_ERROR':
   {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMessage;
      return {...state};
   }
   case 'CLEAR_RESERVATION':
   {
      return dataReservation;
   }
   default:
   {
      return {...state };
   }
   }
};

export default reservation;