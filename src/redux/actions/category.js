import { default as axios } from 'axios'
import AxiosCostum from '../../helpers/AxiosCostum'

const { REACT_APP_URL, R_VEHICLE } = process.env

export const getListCategory = () => {
    return {
        type: 'GET_CATEGORY',
        payload: AxiosCostum().get(`/categories?limit=20`)
    }
}

export const getDetailCategory = (id) => {
    return {
        type: 'GET_CATEGORY',
        payload: AxiosCostum().get((`/categories/${id}`))
    }
}