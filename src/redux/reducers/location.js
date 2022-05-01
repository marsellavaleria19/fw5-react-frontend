const dataLocation = {
   listLocation: [],
   dataLocation : null,
   pageInfo: {},
   message : null,
   errMessage : null,
   isLoading: false,
   error: false
};

const location = (state = dataLocation, action) => {
   switch (action.type) {
   case 'GET_LOCATION_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_LOCATION_FULFILLED':
   {
      const { data } = action.payload;
      state.listLocation = data.result;
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_LOCATION_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   case 'DATA_LOCATION_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'DATA_LOCATION_FULFILLED':
   {
      const { data } = action.payload;
      state.dataLocation = data.result;
      state.message = data.message;
      state.isLoading = false;
      return {...state };
   }
   case 'DATA_LOCATION_REJECTED':
   {
      const {data} = action.payload.response;
      state.isLoading = false;
      state.isError = true;
      state.errMessage = data.message;
      return {...state };
   }
   default:
   {
      return {...state };
   }
   }
};

export default location;