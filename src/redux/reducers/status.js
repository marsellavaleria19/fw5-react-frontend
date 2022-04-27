const dataStatus = {
   listStatus: [],
   pageInfo: {},
   isLoading: false,
   error: false
};

const status = (state = dataStatus, action) => {
   switch (action.type) {
   case 'GET_STATUS_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_STATUS_FULFILLED':
   {
      const { data } = action.payload;
      state.listStatus = data.result;
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_STATUS_REJECTED':
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

export default status;