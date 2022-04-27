const dataHistory = {
   dataHistory: null,
   isError: false,
   isLoading: false,
   errMessage: null,
   message: null,
   listHistory : []
};

const history = (state = dataHistory, action) => {
   switch (action.type) {
   case 'HISTORY_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'HISTORY_FULFILLED':
   {
      const { data } = action.payload;
      state.listHistory = data.result;
      state.isLoading = false;
      state.isError = false;
      state.message = data.message;
      return {...state };
   }
   case 'HISTORY_REJECTED':
   {
      const { data } = action.payload.response;
      state.isLoading = false;
      state.isError = true;
      state.errMessage = data.message;
      state.listHistory = [];
      return {...state };
   }
   default:
   {
      return {...state };
   }
   }
};

export default history;