import { default as axios } from 'axios'
import qs from 'qs'
import AxiosCostum from '../../helpers/AxiosCostum'

export const getListHistory = (token) => {
    console.log("aaaaa")
    return {
        type: 'HISTORY',
        payload: AxiosCostum(token).get(`/histories`)
    }
}

export const getListFilterHistory = (token, search) => {
    return {
        type: 'HISTORY',
        payload: AxiosCostum(token).get(`/histories?search=${search}`)
    }
}

export const deleteHistory = (token, id) => {
    return {
        type: 'HISTORY',
        payload: AxiosCostum(token).delete(`/histories/${id}`)
    }
}