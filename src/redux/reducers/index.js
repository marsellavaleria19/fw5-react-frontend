import { combineReducers } from "redux";

const initialState = {
    token: null
}

const counterState = {
    num: 0
}

const dataState = {
    character: [],
    pageInfo: {},
    isLoading: false,
    error: false
}

const dataCategory = {
    listCategory: [],
    pageInfo: {},
    isLoading: false,
    error: false
}

const dataVehicle = {
    listVehicle: [],
    pageInfo: {},
    isLoading: false,
    error: false
}

const rootReducer = combineReducers({
    auth: (state = initialState, action) => {
        switch (action.type) {
            case 'LOGIN':
                {
                    const { email, password } = action.payload
                    if (email === 'admin@mail.com' && password === '1234') {
                        state.token = 'abc'
                        return state
                    } else {
                        alert('Wrong username or password!')
                        state.token = null
                        return state
                    }
                }
            case 'LOGOUT':
                {
                    state.token = null
                    return state
                }
            default:
                {
                    return {...state }
                }
        }
    },
    counter: (state = counterState, action) => {
        switch (action.type) {
            case 'INCREMENT':
                {
                    state.num = state.num + 1
                    return state
                }
            case 'DECREMENT':
                {
                    state.num = state.num - 1
                    return state
                }
            default:
                {
                    return {...state }
                }
        }
    },
    character: (state = dataState, action) => {
        switch (action.type) {
            case 'GET_CHARACTER_PENDING':
                {
                    state.isLoading = true
                    return state
                }
            case 'GET_CHARACTER_FULFILLED':
                {
                    const { data } = action.payload
                    state.character = data.results
                    state.pageInfo = data.info
                    state.isLoading = false
                    return state
                }
            case 'GET_CHARACTER_REJECTED':
                {
                    state.isLoading = false
                    state.isError = true
                    return state
                }
            default:
                {
                    return state
                }
        }
    },
    category: (state = dataCategory, action) => {
        switch (action.type) {
            case 'GET_CATEGORY_PENDING':
                {
                    state.isLoading = true
                    return state
                }
            case 'GET_CATEGORY_FULFILLED':
                {
                    const { data } = action.payload
                    state.listCategory = data.results
                    state.pageInfo = data.pageInfo
                    state.isLoading = false
                    return state
                }
            case 'GET_CATEGORY_REJECTED':
                {
                    state.isLoading = false
                    state.isError = true
                    return state
                }
            default:
                {
                    return state
                }
        }
    },
    vehicle: (state = dataVehicle, action) => {
        switch (action.type) {
            case 'GET_VEHICLE_PENDING':
                {
                    state.isLoading = true
                    return state
                }
            case 'GET_VEHICLE_FULFILLED':
                {
                    const { data } = action.payload
                    state.listVehicle = data.results
                    state.pageInfo = data.pageInfo
                    state.isLoading = false
                    return state
                }
            case 'GET_VEHICLE_REJECTED':
                {
                    state.isLoading = false
                    state.isError = true
                    return state
                }
            default:
                {
                    return state
                }
        }
    }
})

export default rootReducer