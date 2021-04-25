import {applyMiddleware, combineReducers, createStore} from 'redux'
import {userReducer} from './reducers/userReducer'
import {productReducer} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'
import {historyReducer} from './reducers/historyReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({userReducer, productReducer, cartReducer, historyReducer})
const store = createStore(reducer, applyMiddleware(thunk))
export default store