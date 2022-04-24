const dataLocation = {
   listLocation: [],
   pageInfo: {},
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
   default:
   {
      return {...state };
   }
   }
};

export default location;