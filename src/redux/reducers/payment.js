const dataPayment = {
   dataPayment: null,
   listPaymentType : [],
   isError: false,
   isLoading: false,
   errMessage: null
};

const payment = (state = dataPayment, action) => {
   switch (action.type) {
   case 'PAYMENT_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'PAYMENT_FULFILLED':
   {
      const { data } = action.payload;
      console.log(data);
      state.dataPayment = data.result;
      state.isLoading = false;
      state.isError = false;
      return {...state };
   }
   case 'PAYMENT_REJECTED':
   {
      const { data } = action.payload.response;
      state.isLoading = false;
      state.isError = true;
      state.errMessage = data.message;
      return {...state };
   }
   case 'GET_PAYMENT_TYPE_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_PAYMENT_TYPE_FULFILLED':
   {
      const { data } = action.payload;
      state.listPaymentType = data.result;
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_PAYMENT_TYPE_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   case 'PAYMENT_MESSAGE_SUCCESS':
   {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message;
      return state;
   }
   case 'PAYMENT_MESSAGE_ERROR':
   {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMessage;
      return state;
   }
   default:
   {
      return {...state };
   }
   }
};

export default payment;