import usersReducer from "./usersReducer";
import { combineReducers } from "redux";
// Combine all reducers as root reducer
export default combineReducers({
    users_list: usersReducer,
});