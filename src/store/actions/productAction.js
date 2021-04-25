import {SET_PRODUCTS, SET_LOADING_PRODUCTS} from './actionType'
import axios from 'axios'
import {url} from '../../UrlConfig'

function setProducts(data){
    return{
        type: SET_PRODUCTS,
        payload:data
    }
}

function setIsLoading(data){
    return{
        type: SET_LOADING_PRODUCTS,
        payload: data
    }
}

export function fetchProducts(){
    return(dispatch)=>{
        dispatch(setIsLoading(true))
        axios.get(`${url}/products`)
        .then(res=>{
            console.log(res.data)
            dispatch(setProducts(res.data))
            dispatch(setIsLoading(false))
        })
        .catch(err=>{
            console.log(err)
            dispatch(setIsLoading(false))
        })
    }
}