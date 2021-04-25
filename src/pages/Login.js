import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, SetAuth } from '../store/actions/userAction'
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'



export default function Login() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    function loginAccount(e) {
        e.preventDefault()
        dispatch(logIn(email, password))
        dispatch(SetAuth(true))
        history.push('/')
    }
    

    return (
        <div className="Login">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={loginAccount}>
                    Login
                </Button>
                <p>Don't have an account yet?</p>
                <Link to="/register">Register</Link>
            </Form>
        </div>
    )
}
