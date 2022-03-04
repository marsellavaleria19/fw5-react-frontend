import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import vehicle from "./vehicle";
import counter from "./counter";

const rootReducer = combineReducers({
    auth,
    category,
    vehicle,
    counter
})

export default rootReducer