import { USERS_LIST } from "../actions/users";
import { objArray } from '../components/user-list/users-list';

function usersReducer(state = {}, action: { type: string, payload: typeof objArray }) { console.log('#payload#', action.payload);
    switch (action.type) {
        case USERS_LIST:
            return action.payload;
        default:
            return state;
    }
}

export default usersReducer;