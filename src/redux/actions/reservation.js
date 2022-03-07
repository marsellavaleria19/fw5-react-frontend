import { default as axios } from 'axios'
import qs from 'qs'
import AxiosCostum from '../../helpers/AxiosCostum'


export const reservationInput = (reservation, token) => {
    var rentStartDate = new Date(reservation.date)
    var rentEndDate = null
    var day = parseInt(reservation.day)
    var tempDay = 0
    if (day < 2) {
        rentEndDate = rentStartDate
    } else {
        day = day - 1
        tempDay = rentStartDate.getDate() + parseInt(day)
        rentEndDate = new Date(new Date().setDate(tempDay))
    }
    var data = {}
    data.qty = reservation.qty
    data.idVehicle = reservation.vehicle
    data.idUser = reservation.user
    data.startRentDate = rentStartDate
    data.endRentDate = rentEndDate
    data.status = 7
    data.prepayment = 0
    return {
        type: 'RESERVATION',
        payload: AxiosCostum(token).post('/histories', qs.stringify(data))
    }
}


export const getDetailReservation = (id) => {
    return {
        type: 'RESERVATION',
        payload: AxiosCostum().get(`/histories/${id}`)
    }
}