import {SET_PRODUCTS, SET_LOADING_PRODUCTS} from '../actions/actionType'

const initialState={
    products:[],
    isLoading: false
}

export function productReducer(state=initialState, action){
    switch(action.type){
        case SET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
        case SET_LOADING_PRODUCTS:
            return{
                ...state,
                isLoading: action.payload
            }
        default:
            return{
                ...state
            }
    }
}