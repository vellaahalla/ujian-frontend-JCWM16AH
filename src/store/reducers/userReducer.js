import {LOG_IN, SET_AUTH, REGISTER } from '../actions/actionType'

const initialState={
    id: null,
    email: null,
    cart: [],
    isLogin: false,
    users: []
}

export function userReducer(state=initialState, action){
    switch (action.type){
        case LOG_IN:
            return{
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                cart: action.payload.cart
            }
        case SET_AUTH:
            return{
                ...state,
                isLogin: action.payload
            }
        case REGISTER:
            return{
                ...state,
                users: action.payload
            }
        default:
            return{
                ...state
            }
    }
}