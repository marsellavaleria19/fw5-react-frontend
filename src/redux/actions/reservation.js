import { default as axios } from 'axios'
import qs from 'qs'

const { REACT_APP_URL } = process.env

export const reservationInput = (reservation) => {
    const url = `${REACT_APP_URL}/reservation`
    var rentStartDate = new Date(reservation.date)
    var tempDay = rentStartDate.getDate() + parseInt(reservation.day)
    var rentEndDate = new Date(new Date().setDate(tempDay))
    var data = {}
    data.qty = reservation.qty
    data.vehicle = reservation.vehicle
    data.user = reservation.user
    data.rentStartDate = rentStartDate
    data.rentEndDate = rentEndDate
    return {
        type: 'RESERVATION',
        payload: axios.post(url, qs.stringify(data))
    }
}