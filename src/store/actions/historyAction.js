import { SET_HISTORIES, SET_LOADING_HISTORIES, DELETE_TRANSACTION } from "./actionType";
import axios from 'axios'
import {url} from '../../UrlConfig'

function setHistories(data){
    return {
        type: SET_HISTORIES,
        payload: data
    }
}

function setIsLoading(data){
    return {
        type: SET_LOADING_HISTORIES,
        payload: data
    }
}

export function fetchHistory(){
    return (dispatch)=>{
        dispatch(setIsLoading(true))
        axios.get(`${url}/histories`)
        .then(res=>{
            console.log(res.data)
            dispatch(setHistories(res.data))
            dispatch(setIsLoading(false))
        })
        .catch(err=>{
            console.log(err)
            dispatch(setIsLoading(false))
        })
    }
}

export function deleteTransaction(id){
    return (dispatch)=>{
        axios.delete(`${url}/histories/${id}`)
        .then(res=>{
            dispatch({
                type: DELETE_TRANSACTION,
                payload: id
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}