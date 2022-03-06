const dataReservation = {
    dataReservation: null,
    isError: false,
    isLoading: false,
    errMessage: null,
}

const reservation = (state = dataReservation, action) => {
    switch (action.type) {
        case 'RESERVATION_PENDING':
            {
                state.isLoading = true
                return {...state }
            }
        case 'RESERVATION_FULFILLED':
            {
                const { data } = action.payload
                state.dataReservation = data.results
                state.isLoading = false
                state.isError = false
                return {...state }
            }
        case 'RESERVATION_REJECTED':
            {
                const { data } = action.payload.response
                state.isLoading = false
                state.isError = true
                state.errMessage = data.message
                return {...state }
            }
        default:
            {
                return {...state }
            }
    }
}

export default reservation