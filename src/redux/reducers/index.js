import { combineReducers } from "redux";
import auth from "./auth";
import category from "./category";
import vehicle from "./vehicle";
import counter from "./counter";
import reservation from "./reservation";

const rootReducer = combineReducers({
    auth,
    category,
    vehicle,
    counter,
    reservation
})

export default rootReducer