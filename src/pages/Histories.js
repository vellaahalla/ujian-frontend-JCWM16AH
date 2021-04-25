import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchHistory, deleteTransaction } from '../store/actions/historyAction'
import { Table, Button } from 'react-bootstrap'


export default function Histories() {
    const dispatch = useDispatch()
    const { histories, isLoading } = useSelector(state => state.historyReducer)

    useEffect(() => {
        dispatch(fetchHistory())
    }, [])

    function deleteTheTransaction(id){
        console.log('delete ya')
        dispatch(deleteTransaction(id))
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    } else {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {histories.map((history) => {
                        return (
                            <tr>
                                <td>{history.id}</td>
                                <td>{history.date}</td>
                                <td>{history.data.map(data=>data.name)}</td>
                                <td>{history.status}</td>
                                <td><Button variant="secondary" onClick={()=>deleteTheTransaction(history.id)}>Cancel Transaction</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
