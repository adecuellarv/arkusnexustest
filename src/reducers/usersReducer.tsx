import { USERS_LIST } from "../actions/users";
import { objArrayUsers } from '../models/users';

function usersReducer(state = {}, action: { type: string, payload: typeof objArrayUsers }) {
    switch (action.type) {
        case USERS_LIST:
            return action.payload;
        default:
            return state;
    }
}

export default usersReducer;