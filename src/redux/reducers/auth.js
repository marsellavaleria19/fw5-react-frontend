const dataLogin = {
    token: null,
    isError: false,
    isLoading: false,
    errMessage: null
}

const auth = (state = dataLogin, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING':
            {
                state.isLoading = true
                return {...state }
            }
        case 'LOGIN_FULFILLED':
            {
                const { data } = action.payload
                state.token = data.results.token
                console.log(state.token)
                state.isLoading = false
                state.isError = false
                window.localStorage.setItem('token', state.token)
                return {...state }
            }
        case 'LOGIN_REJECTED':
            {
                const { data } = action.payload.response
                state.isLoading = false
                state.isError = true
                state.errMessage = data.message
                return {...state }
            }
        case 'LOGOUT':
            {
                state.token = null
                return {...state }
            }
        default:
            {
                return {...state }
            }
    }
}

export default auth