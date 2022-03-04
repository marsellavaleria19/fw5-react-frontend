import { default as axios } from 'axios'
import qs from 'qs'

const { REACT_APP_URL } = process.env

export const reservationInput = (reservation) => {
    const url = `${REACT_APP_URL}/histories`
    var rentStartDate = new Date(reservation.date)
    var tempDay = rentStartDate.getDate() + parseInt(reservation.day)
    var rentEndDate = new Date(new Date().setDate(tempDay))
    var data = {}
    data.qty = reservation.qty
    data.idVehicle = reservation.vehicle
    data.idUser = reservation.user
    data.startRentDate = rentStartDate
    data.endRentDate = rentEndDate
    data.status = 7
    data.prepayment = 0
    console.log(data)
    return {
        type: 'RESERVATION',
        payload: axios.post(url, qs.stringify(data))
    }
}