import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/actions/productAction'
import { Card, Button, Modal, Form } from 'react-bootstrap'
import './Home.css'
import { addCart } from '../store/actions/cartAction'
import { keepLogin } from '../store/actions/userAction'
import { useParams } from "react-router";



export default function Home() {
    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(state => state.productReducer)
    const { isLogin } = useSelector(state => state.userReducer)
    const [product, setProduct] = useState('')
    const [number, setNumber] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { carts } = useSelector(state => state.cartReducer)
    const { productId } = useParams();


    useEffect(() => {
        dispatch(fetchProducts())
        keepLogin()
    }, [])

    function addToCart(product) {
        if (isLogin) {
            handleShow()
            setProduct(product)
        } else {
            alert('Anda belum Login')
        }

    }

    function addProduct() {
        if (number > product.stock) {
            alert('Jumlah Melebihi Stock')
        } else if(number===0){
            alert('Tidak Boleh Kosong')
        }
        else {
            let id = Number(localStorage.getItem('userID'))
            const data = {
                name: product.name,
                img: product.img,
                category: product.category,
                description: product.description,
                stock: product.stock,
                type: product.type,
                price: product.price,
                userID: id,
                number
            }
            dispatch(addCart(data))
            handleClose()
        }

    }

    // function addProduct(){
    //     const isInCart = arrayCheck(carts,productId)

    //     if(isInCart){
    //       const indexInCart = carts.findIndex(cart=> cart.id === Number(productId))
    //       const newNumber = carts[indexInCart].number + number

    //       dispatch(editCart({...carts, newNumber}))
    //       axios.put(`${url}/carts/${productId}`,{...product,number})
    //     }else{
    //       dispatch(addCart(data))
    //       axios.post(`${url}/carts`,{...product,number: 1})
    //     }
    // }

    return (
        <div className="Home">
            {products.map(product => {
                return (
                    <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={product.img} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Button variant="primary" onClick={() => { addToCart(product) }}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                )
            })}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control size="sm" type="number" placeholder="Amount of Product" min="0" onChange={(e) => setNumber(Number(e.target.value))} value={number} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                        </Button>
                    <Button variant="primary" onClick={addProduct}>
                        Add to Cart
                        </Button>
                </Modal.Footer>
            </Modal>
           
        </div>
    )
}
