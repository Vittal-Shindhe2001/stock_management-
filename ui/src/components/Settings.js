import { useDispatch, useSelector } from "react-redux"
import { startGetDeletedProduct, startUpdateUndoProduct } from "../actions/products_action"
import { useEffect } from "react"

const Settings = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetDeletedProduct())
    }, [])
    const products = useSelector((state) => state.products.data)
    const handleUndo = (id) => {
        dispatch(startUpdateUndoProduct(id))
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
                                            <button className='btn btn-danger' onClick={() => handleUndo(product._id)}>
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
        </div>
    )
}

export default Settings