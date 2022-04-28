const dataHistory = {
   dataHistory: null,
   isError: false,
   isSuccess:false,
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
   case 'HISTORY_DELETE_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'HISTORY_DELETE_FULFILLED':
   {
      const { data } = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.listHistory;
      state.message = data.message;
      return {...state };
   }
   case 'HISTORY_DELETE_REJECTED':
   {
      const { data } = action.payload.response;
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errMessage = data.message;
      state.listHistory = [];
      return {...state };
   }
   case 'GET_HISTORY':
   {
      state.listHistory;
      return {...state};
   }
   case 'HISTORY_NOT_LOADING' :{
      state.isLoading = false;
      return {...state};
   }
   case 'HISTORY_MESSAGE_SUCCESS':
   {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message;
      return {...state};
   }
   case 'HISTORY_MESSAGE_ERROR':
   {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMessage;
      return {...state};
   }
   default:
   {
      return {...state };
   }
   }
};

export default history;