import { ADD_CART, EDIT_CART, SET_CART, SET_LOADING_CART, DELETE_CART, DELETE_ALL_CART } from "../actions/actionType";

const initialState = {
    carts: [],
    isLoading: false
}

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CART:
            return {
                ...state,
                carts: state.carts.concat(action.payload)
            }
        case SET_CART:
            return {
                ...state,
                carts: action.payload
            }
        case SET_LOADING_CART:
            return {
                ...state,
                isLoading: action.payload
            }
        case DELETE_CART:
            return {
                ...state,
                carts: state.carts.filter(cart=> cart.id !== action.payload)
            }
        case EDIT_CART:
            const index = state.carts.findIndex(cart=> cart.id === action.payload.id)
            const newCart = [...state.carts]
            newCart[index]= action.payload
            return {
                ...state,
                carts: newCart
            }
        case DELETE_ALL_CART:
            return{
                ...state,
                carts: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
