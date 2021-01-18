import axios from 'axios';
import idx from 'idx';
import { Dispatch } from 'redux';
import { getEnvironment } from '../config/config';
const config = getEnvironment();

export const USERS_LIST = 'USERS_LIST';

export const getUsers = (page: number) =>
    async (dispatch: Dispatch) => {
        console.log('entra a dispatch');
        console.log('entra al dispatch');
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