export const USERS_LIST = 'USERS_LIST';

export const getUsers = (payload: object) => {
    return ({
        type: USERS_LIST,
        payload
    });
};