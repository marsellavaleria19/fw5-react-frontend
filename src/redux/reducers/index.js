import { combineReducers } from 'redux';
import auth from './auth';
import category from './category';
import vehicle from './vehicle';
import counter from './counter';
import reservation from './reservation';
import payment from './payment';
import history from './history';
import search from './search';
import profile from './profile';
import location from './location';
import status from './status';
import paymentType from './paymentTypes';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const persistForAuth = {
   key: 'auth',
   storage: storage,
};

const persistForCategory = {
   key : 'category',
   storage : storage,
};

const persistForVehicle = {
   key : 'vehicle',
   storage : storage,
};
 
const rootReducer = combineReducers({
   auth : persistReducer(persistForAuth,auth),
   category : persistReducer(persistForCategory,category),
   vehicle : persistReducer(persistForVehicle,vehicle),
   counter,
   reservation,
   payment,
   history,
   search,
   profile,
   location,
   status,
   paymentType
});

export default rootReducer;