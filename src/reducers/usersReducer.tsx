import { USERS_LIST } from "../actions/users";

function usersReducer(state = {}, action: { type: string, payload: object }) {
    switch (action.type) {
        case USERS_LIST:
            return Object.assign({}, state,
                action.payload
            );
        default:
            return state;
    }
}

export default usersReducer;