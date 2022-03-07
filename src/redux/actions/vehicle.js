import { default as axios } from 'axios'


const { REACT_APP_URL, REACT_APP_LIMIT_VEHICLE } = process.env

export const getListVehicle = () => {
    return {
        type: 'GET_VEHICLE',
        payload: axios.get(`${REACT_APP_URL}/vehicles?limit=20`)
    }
}

export const getListVehicleByMonth = () => {
    var month = new Date().getMonth()
    console.log(month)
    return {
        type: 'GET_VEHICLE',
        payload: axios.get(`${REACT_APP_URL}/vehicles?month=${month}&limit=3`)
    }
}

export const getListVehicleByCategory = (idCategory) => {
    return {
        type: 'GET_VEHICLE',
        payload: axios.get(`${REACT_APP_URL}/vehicles/category/${idCategory}?limit=${REACT_APP_LIMIT_VEHICLE}`)
    }
}

export const getListVehicleByUrl = (url) => {
    return {
        type: 'GET_VEHICLE_NEXT',
        payload: axios.get(`${url}`)
    }
}

export const getDetailVehicle = (id) => {
    return {
        type: 'GET_VEHICLE',
        payload: axios.get(`${REACT_APP_URL}/vehicles/${id}`)
    }
}