import AxiosCostum from '../../helpers/AxiosCostum';

export const getListHistory = (token) => {
   console.log('aaaaa');
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).get('/histories')
   };
};

export const getListHistoryByUserId = (token,id) => {
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).get(`/histories/user/${id}`)
   };
};

export const getListHistoryFilter = (dataParams) => {

   const filledParams = ['category_id', 'location', 'status_id', 'name', 'date'];

   const url = (dataParams) => {
      var result = '';
      filledParams.forEach((item) => {
         if (dataParams[item]) {
            if (result == '') {
               result = `${item}=${dataParams[item]}`;
            } else {
               result += `&${item}=${dataParams[item]}`;
            }
         }
      });
      return `${result}&limit=16`;
   };

   return {
      type: 'HISTORY',
      payload: AxiosCostum().get(`/search?${url(dataParams)}&limit=16`)
   };
};

export const getListHistoryFilterByUserId = (dataParams='',id,token) => {

   const filledParams = ['category_id', 'location', 'status_id', 'search', 'date'];

   console.log(token);
   console.log('data params',dataParams);
   const url = (dataParams) => {
      var result = '';
      if(dataParams!==''){
         filledParams.forEach((item) => {
            if (dataParams[item]) {
               if (result == '') {
                  result = `${item}=${dataParams[item]}`;
               } else {
                  result += `&${item}=${dataParams[item]}`;
               }
            }
         });
      }
      return `${result}&limit=5`;
   };

   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).get(`/histories/user/${id}?${url(dataParams)}`)
   };
};

export const deleteHistory = (token, id) => {
   return {
      type: 'HISTORY',
      payload: AxiosCostum(token).delete(`/histories/${id}`)
   };
};