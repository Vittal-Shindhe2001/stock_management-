import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteProduct, startListProducts } from '../actions/products_action'
import FormEdit from './Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ShowProducts = () => {
    const [product, setProduct] = useState({})
    // modal States
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const dispatch = useDispatch()
    // calling useeffect hooks to call get api
    useEffect(() => {
        dispatch(startListProducts())
    }, [dispatch])
    // Retrieve the products data from the Redux store
    const products = useSelector((state) => state.products.data)
    //delete product
    const handleDelete = (id) => {
        dispatch(startDeleteProduct(id));
    }
    const handleEdit = (product) => {
        handleShow()
        setProduct(product)

    }
    return (
        <div className="card mt-2 ms-2">
            <div className="card-header">
                <h3>Products Details</h3>
            </div>
            <div className="card-body">
                <div className="card-shadow">
                    {products.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <button type="button" className='btn btn-primary' onClick={() => handleEdit(product)}
                                                data-toggle="modal"
                                                data-target="#exampleModal"
                                            >
                                                <i className="fas fa-pen"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => handleDelete(product._id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>) : (
                        <tr>
                            <td colSpan="4">No products available</td>
                        </tr>
                    )}
                </div>
            </div>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormEdit data={product} onClose={handleClose} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}

export default ShowProducts
