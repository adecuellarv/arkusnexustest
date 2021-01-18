import axios from 'axios';
import idx from 'idx';
import { Dispatch } from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import { objectAdduser, objArrayUsers } from '../models/users';
import { getEnvironment } from '../config/config';
const config = getEnvironment();

export const USERS_LIST = 'USERS_LIST';

export const getUsers = (page: number) =>
    async (dispatch: Dispatch) => {
        const reqresinFunctions = config.reqresin;
        const url = `${reqresinFunctions.users}?page=${page}`;
        const response = await axios({
            url,
            method: 'get'
        });
        const datas = idx(response, _ => _.data.data);
        if (datas) {
            dispatch({
                type: USERS_LIST,
                payload: datas
            });
            return datas;
        }
        else return { error: 'failed' };
    };

export const getUser = async (id: number) => {
    const reqresinFunctions = config.reqresin;
    const url = `${reqresinFunctions.users}${id}`;
    const response = await axios({
        url,
        method: 'get'
    });
    const datas = idx(response, _ => _.data.data);
    if (datas) {
        return datas;
    }
    else return { error: 'failed' };
};

export const addUser = (data: typeof objectAdduser, users_list: typeof objArrayUsers) =>
    async (dispatch: Dispatch) => {
        const reqresinFunctions = config.reqresin;
        const url = `${reqresinFunctions.users}`;
        const response = await axios({
            url,
            method: 'post',
            data
        });
        const datas = idx(response, _ => _.data);
        if (datas) {
            dispatch({
                type: USERS_LIST,
                payload: createNewUserIntoStore(users_list, data)
            });
            return datas;
        }
        else return { error: 'failed' };
    };

export const updateUser = (data: typeof objectAdduser, users_list: typeof objArrayUsers, userid: number) =>
    async (dispatch: Dispatch) => {
        const reqresinFunctions = config.reqresin;
        const url = `${reqresinFunctions.users}/${userid}`;
        const response = await axios({
            url,
            method: 'put',
            data
        });
        const datas = idx(response, _ => _.data);
        if (datas) {
            dispatch({
                type: USERS_LIST,
                payload: remplaceElement(users_list, data, userid)
            });
            return datas;
        }
        else return { error: 'failed' };
    };

const remplaceElement = (users_list: typeof objArrayUsers, data: typeof objectAdduser, userid: number) => {
    const arrayClone = cloneDeep(users_list);
    const newArray = [];
    for (let index = 0; index < arrayClone.length; index++) {
        const element = arrayClone[index];
        if (index === userid - 1) {
            newArray.push({
                id: element.id,
                first_name: data.name,
                last_name: element.last_name,
                avatar: element.avatar,
                email: element.email
            });
        } else {
            newArray.push(element);
        }
    }
    return newArray;
};

const createNewUserIntoStore = (users_list: typeof objArrayUsers, data: typeof objectAdduser) => {
    const arrayClone = cloneDeep(users_list);
    const newArray = [];
    for (let index = 0; index < arrayClone.length; index++) {
        const element = arrayClone[index + 1];
        if (index === 0) {
            newArray.push({
                id: arrayClone.length + 1,
                first_name: data.name,
                last_name: 'Test',
                avatar: 'https://picsum.photos/128/128?grayscale',
                email: `${data.name}@ggs.mx`
            });
            newArray.push(element);
        } else {
            if (index + 1 < arrayClone.length)
                newArray.push(element);
            else newArray.push(arrayClone[0]);
        }
    }

    return newArray;
};