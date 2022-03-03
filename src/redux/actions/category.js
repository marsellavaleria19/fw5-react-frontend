import { default as axios } from 'axios'

const { REACT_APP_URL, REACT_APP_LIMIT_VEHICLE } = process.env

export const getListCategory = () => {
    return {
        type: 'GET_CATEGORY',
        payload: axios.get(`http://localhost:5000/categories`)
    }
}

export const getDetailCategory = (id) => {
    return {
        type: 'GET_CATEGORY',
        payload: axios.get(`${REACT_APP_URL}/categories/${id}`)
    }
}