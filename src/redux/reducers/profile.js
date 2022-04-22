const dataProfile = {
   dataProfile: null,
   isError: false,
   isSubmit: false,
   isLoading: false,
   errMessage: null,
   message: null
};

const profile = (state = dataProfile, action) => {
   switch (action.type) {
   case 'PROFILE_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'PROFILE_FULFILLED':
   {
      const { data } = action.payload;
      state.dataProfile = data.results;
      state.isLoading = false;
      state.isError = false;
      state.message = data.message;
      state.isSubmit = true;
      return {...state };
   }
   case 'CLEAR_PROFILE':
   {
      return dataProfile;
   }
   case 'PROFILE_REJECTED':
   {
      const { data } = action.payload.response;
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

export default profile;