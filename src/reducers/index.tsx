import usersReducer from "./usersReducer";
import { combineReducers } from "redux";
// Combine all reducers as root reducer
const rootReducer =  combineReducers({
    users_list: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;