const dataPaymentType = {
   listPaymentType: [],
   pageInfo: {},
   isLoading: false,
   error: false
};

const paymentType = (state = dataPaymentType, action) => {
   switch (action.type) {
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
   default:
   {
      return {...state };
   }
   }
};

export default paymentType;