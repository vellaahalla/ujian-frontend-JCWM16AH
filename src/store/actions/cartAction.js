import { ADD_CART, DELETE_CART, EDIT_CART, SET_CART, SET_LOADING_CART } from "./actionType";
import axios from 'axios'
import { url } from '../../UrlConfig'

function addToCart(data) {
    return {
        type: ADD_CART,
        payload: data
    }
}


export function addCart(data) {
    const id= localStorage.getItem('id')
    return (dispatch) => {
        axios.post(`${url}/carts`, data)
            .then(res => {
                dispatch(addToCart(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function fetchCart() {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING_CART,
            payload: true
        })
        axios.get(`${url}/carts`)
            .then(res => {
                dispatch({
                    type: SET_CART,
                    payload: res.data
                })
                dispatch({
                    type: SET_LOADING_CART,
                    payload: false
                })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export function editCart(data) {
    return (dispatch) => {
        axios.put(`${url}/carts/${data.id}`, data)
            .then((res) =>{
                dispatch({
                    type: EDIT_CART,
                    payload: res.data
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }

}

export function deleteCart(id){
    return (dispatch)=>{
        axios.delete(`${url}/carts/${id}`)
        .then(res=>{
            dispatch({
                type: DELETE_CART,
                payload: id
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}