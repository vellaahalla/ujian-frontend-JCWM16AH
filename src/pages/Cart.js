import React, { useEffect, useState } from 'react'
import { fetchCart,deleteCart, editCart } from '../store/actions/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Table, Modal, Form} from 'react-bootstrap'
import {url} from '../UrlConfig'
import axios from 'axios'
import { DELETE_ALL_CART } from '../store/actions/actionType'
import { useHistory } from 'react-router'

export default function Cart() {

    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [number, setNumber] =useState('')
    const [cart, setCart]= useState('')
    const {carts, isLoading} = useSelector(state=> state.cartReducer)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchCart())
    }, [])

    function deleteTheCart(id){
        dispatch(deleteCart(id))
    }

    function editTheCart(cart){
        handleShow()
        setCart(cart)
    }

    function updateCart(){
        if (number>cart.stock){
            alert('Jumlah Melebihi Stock')
        } else{
            let id = Number(localStorage.getItem('userID'))
            const data = {
                name: cart.name,
                img: cart.img,
                category: cart.category,
                description:cart.description,
                stock: cart.stock,
                type: cart.type,
                price: cart.price,
                userID: id,
                number,
                id: cart.id
            }
            dispatch(editCart(data)) 
            handleClose()
        }

    }

    function checkout(){

        alert('Anda yakin checkout?')
        axios.post(`${url}/histories`,{data:carts, date: new Date(), status: "belum bayar"})
        .then(res=>{
            deleteAllCart()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function deleteAllCart(){
        const promiseAll = []
        carts.forEach(el=>{
            promiseAll.push(axios.delete(`${url}/carts/${el.id}`))
        })
        Promise.all(promiseAll)
        .then(res=>{
            dispatch({
                type: DELETE_ALL_CART,
                payload: []
            })
            history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    } else {
        return (
            <div>
                {carts.length === 0 ? <h3>No Product Added</h3> : <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map(cart => {
                            return (
                                < tr key={cart.id}>
                                    <td>{cart.id}</td>
                                    <td><img src={cart.img} alt={cart.name} width="60px" /></td>
                                    <td>{cart.name}</td>
                                    <td>{cart.price}</td>
                                    <td>{cart.number}</td>
                                    <td>
                                        <Button variant="secondary" style={{marginRight:"10px"}} onClick={()=>{editTheCart(cart)}}>Edit</Button>
                                        <Button variant="secondary" onClick={()=>deleteTheCart(cart.id)}>Delete</Button>
                                    </td>
                                </tr> 
                            )
                        })}
                    </tbody>
                </Table>}

                <Button onClick={checkout}>Checkout</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Set Number</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Control size="sm" type="number" placeholder="Amount of Product"  min="0" onChange={(e)=> setNumber(Number(e.target.value))} value={number}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={updateCart}>
                            Edit Cart
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
