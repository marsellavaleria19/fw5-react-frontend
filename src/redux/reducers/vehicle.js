const dataVehicle = {
   listVehicle: [],
   listVehiclepopular : [],
   listAllVehicle : [],
   pageInfo: {},
   isLoading: false,
   isSuccess : false,
   error: false,
   errMessage : null,
   message : null
};


const vehicle = (state = dataVehicle, action) => {
   switch (action.type) {
   case 'GET_VEHICLE_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_VEHICLE_FULFILLED':
   {
      const { data } = action.payload;
      state.listVehicle = data.result;
      state.listAllVehicle = [...state.listAllVehicle,...data.result];
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_VEHICLE_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }
   case 'GET_VEHICLE_POPULAR_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_VEHICLE_POPULAR_FULFILLED':
   {
      const { data } = action.payload;
      state.listVehiclepopular = data.result;
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_VEHICLE_POPULAR_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      return {...state };
   }

   case 'GET_VEHICLE_NEXT_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'GET_VEHICLE_NEXT_FULFILLED':
   {
      const { data } = action.payload;
      state.listVehicle = [...state.listVehicle, ...data.result];
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      return {...state };
   }
   case 'GET_VEHICLE_NEXT_REJECTED':
   {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      return {...state };
   }
   case 'ADD_VEHICLE_PENDING':
   {
      state.isLoading = true;
      return {...state };
   }
   case 'ADD_VEHICLE_FULFILLED':
   {
      const { data } = action.payload;
      state.dataVehicle = data.result;
      state.pageInfo = data.pageInfo;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = data.message;

      return {...state };
   }
   case 'ADD_VEHICLE_REJECTED':
   {
      const {data} = action.payload.response;
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errMessage = data.message;
      return {...state };
   }
   case 'VEHICLE_MESSAGE_SUCCESS':
   {
      state.isError = false;
      state.isSuccess = false;
      state.message;
      return {...state};
   }
   case 'VEHICLE_MESSAGE_ERROR':
   {
      state.isError = false;
      state.isSuccess = false;
      state.errMessage;
      return {...state};
   }
   case 'CLEAR_VEHICLE':
   {
      return dataVehicle;
   }
   default:
   {
      return {...state };
   }
   }
};

export default vehicle;