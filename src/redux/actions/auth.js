import { default as axios } from 'axios'
import qs from 'qs'

const { REACT_APP_URL } = process.env

export const loginProcess = (email, password) => {
    const data = { 'email': email, 'password': password };
    const url = `${REACT_APP_URL}/auth/login`
    return {
        type: 'LOGIN',
        payload: axios.post(url, qs.stringify(data))
    }
}