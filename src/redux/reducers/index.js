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

const rootReducer = combineReducers({
   auth,
   category,
   vehicle,
   counter,
   reservation,
   payment,
   history,
   search,
   profile
});

export default rootReducer;