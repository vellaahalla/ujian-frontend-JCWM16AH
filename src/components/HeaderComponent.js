import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Dropdown, Badge } from 'react-bootstrap'
import './HeaderComponent.css'
import { useDispatch, useSelector } from 'react-redux'
import { SetAuth } from '../store/actions/userAction'


export default function HeaderComponent() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { isLogin, email } = useSelector((state) => state.userReducer)
    const {carts} = useSelector((state)=>state.cartReducer)

    function navigateToLogin() {
        history.push('/login')
    }

    function logout() {
        dispatch(SetAuth(false))
        localStorage.removeItem('userID')
    }

    return (
        <div className="HeaderComponent">
            <div className="HeaderComponent-navigation">
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/histories">History</Link>
                <div className="HeaderComponent-login">
                    {isLogin ? <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {email}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> : <Button onClick={navigateToLogin}>Login</Button>}
                </div>
                <div className="HeaderComponent-badge">
                    <Button variant="light">
                        <Link to='/cart'>Cart<Badge variant="light">{carts.length}</Badge>
                            <span className="sr-only">unread messages</span></Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
