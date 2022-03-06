import { default as axios } from 'axios'
import qs from 'qs'
import AxiosCostum from '../../helpers/AxiosCostum'

const { REACT_APP_URL } = process.env

export const loginProcess = (email, password) => {
    const data = { 'email': email, 'password': password };
    const url = `${REACT_APP_URL}/auth/login`
    return {
        type: 'LOGIN',
        payload: AxiosCostum().post(url, qs.stringify(data))
    }
}

export const getDataUser = (token) => {
    return {
        type: 'LOGIN_PROFILE',
        payload: AxiosCostum(token).get('/profile')
    }
}