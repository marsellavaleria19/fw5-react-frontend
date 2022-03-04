import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import vehicle from "./vehicle";

const rootReducer = combineReducers({
    auth,
    category,
    vehicle
})

export default rootReducer