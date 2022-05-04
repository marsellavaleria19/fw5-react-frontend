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
      state.message = 'Data reservation created successfully';
      state.isError = false;
      return {...state };
   }
   case 'RESERVATION_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      state.errMessage = 'Data reservetion failed to create';
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