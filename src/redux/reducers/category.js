const dataCategory = {
   listCategory: [],
   dataCategory : null,
   pageInfo: {},
   isLoading: false,
   message : null,
   errMessage : null,
   error: false
};

const category = (state = dataCategory, action) => {
   switch (action.type) {
   case 'GET_CATEGORY_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_CATEGORY_FULFILLED':
   {
      const { data } = action.payload;
      state.listCategory = data.result;
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_CATEGORY_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   case 'GET_DETAIL_CATEGORY_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_DETAIL_CATEGORY_FULFILLED':
   {
      const { data } = action.payload;
      state.dataCategory = data.result;
      state.isLoading = false;
      state.message = data.message;
      return {...state };
   }
   case 'GET_DETAIL_CATEGORY_REJECTED':
   {
      const {data} = action.payload.response;
      state.isLoading = false;
      state.isError = true;
      state.errMessage = data.message;
      return {...state };
   }
   case 'GET_DATA_CATEGORY':
   {
      state.dataCategory = action.payload;
      state.isLoading = false;
      return {...state };
   }
   default:
   {
      return {...state };
   }
   }
};

export default category;