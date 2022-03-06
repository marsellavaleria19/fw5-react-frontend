const dataPayment = {
    dataPayment: null,
    isError: false,
    isLoading: false,
    errMessage: null
}

const payment = (state = dataPayment, action) => {
    switch (action.type) {
        case 'PAYMENT_PENDING':
            {
                state.isLoading = true
                return {...state }
            }
        case 'PAYMENT_FULFILLED':
            {
                const { data } = action.payload
                console.log(data)
                state.dataPayment = data.results
                state.isLoading = false
                state.isError = false
                return {...state }
            }
        case 'PAYMENT_REJECTED':
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

export default payment