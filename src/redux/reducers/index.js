import { combineReducers } from "redux"
import userAuthReducer from "./userAuthReducer"
import projectReducer from "./projectReducer";
import SearchReducer from "./SearchReducer";

const myReducer = combineReducers({
    user: userAuthReducer,
    projects: projectReducer,
    searchTerm: SearchReducer,
});

export default myReducer;