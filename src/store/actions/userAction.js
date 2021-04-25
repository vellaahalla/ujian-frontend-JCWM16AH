import {LOG_IN, REGISTER, SET_AUTH} from './actionType'
import axios from 'axios'
import {url} from '../../UrlConfig'
// import {useHistory} from 'react-router-dom'

export function SetAuth(isLogin){
    return{
        type: SET_AUTH,
        payload: isLogin
    }
}

export function logIn(email,password){
    // const history = useHistory()

    return (dispatch) => {
        axios.get(`${url}/users?email=${email}&password=${password}`)
        .then(res=>{
            localStorage.setItem('userID',res.data[0].id)
            dispatch({
                type: LOG_IN,
                payload: res.data[0]
            })
            // history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export function keepLogin(){
    let id = localStorage.getItem('userID')

    return (dispatch)=>{
        axios.get(`${url}/users?id=${id}`)
        .then(res=>{
            dispatch({
                type: LOG_IN,
                payload: res.data[0]
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}


export function register(data) {
    return (dispatch) => {
        axios.post(`${url}/users`, data)
            .then(res => {
                dispatch(addToUser(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

function addToUser(data) {
    return {
        type: REGISTER,
        payload: data
    }
}