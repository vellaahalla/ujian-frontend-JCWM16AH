import {SET_HISTORIES, SET_LOADING_HISTORIES, DELETE_TRANSACTION} from '../actions/actionType'

const initialState = {
    histories: [],
    isLoading: false
}

export  function historyReducer(state=initialState, action){
    switch (action.type) {
        case SET_HISTORIES:
            return{
                ...state,
                histories: action.payload
            }
        case SET_LOADING_HISTORIES:
            return{
                ...state,
                isLoading: action.payload
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                histories: state.histories.filter(history=> history.id !== action.payload)
            }
        default:
            return{
                ...state
            }
    }
}