import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { startAddProduct, startListProducts, startUpdateProduct } from "../actions/products_action"

const Form = ({ onClose, data }) => {
    // state variables
    const [productName, setProductName] = useState(data?.name || '');
    const [category, setCategory] = useState(data?.category || '');
    const [price, setPrice] = useState(data?.price || '');
    const [quantity, setQuantity] = useState(data?.quantity || '');
    const [errors, setErrors] = useState({})

    //USEDISPATCH HOOK
    const dispatch = useDispatch()
    const handle_change = (e) => {
        const { id, value } = e.target
        if (id === "productName") {
            setProductName(value)
        } else if (id === "category") {
            setCategory(value)
        } else if (id === "price") {
            setPrice(value)
        } else if (id === "quantity") {
            setQuantity(value)
        }
        validateInput(id, value)
    }

    const validateInput = (id, value) => {
        let error = ''

        if (id === 'productName' && !value) {
            error = 'Product Name is required'
        } else if (id === 'category' && !value) {
            error = 'Category is required'
        } else if (id === 'price' && (!value || isNaN(value) || Number(value) <= 0)) {
            error = 'Valid price is required'
        } else if (id === 'quantity' && (!value || isNaN(value) || Number(value) <= 0)) {
            error = 'Valid quantity is required'
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: error
        }))
    }
    const handleblur = (e) => {
        const { id, value } = e.target
        validateInput(id, value)
    }
    // const handle_submit = (e) => {
    //     e.preventDefault();

    //     // Validate each input
    //     validateInput('productName', productName);
    //     validateInput('category', category);
    //     validateInput('price', price);
    //     validateInput('quantity', quantity);

    //     // Check if there are any validation errors
    //     const hasErrors = Object.values(errors).some((error) => error);


    //     if (!hasErrors) {
    //         const formData = {
    //             name: productName,
    //             category,
    //             price,
    //             quantity
    //         };

    //         // Function to reset form fields
    //         const reset = () => {
    //             setProductName('');
    //             setCategory('');
    //             setPrice('');
    //             setQuantity('');
    //         };
    //         if (Object.values(errors).length > 0) {
    //             dispatch(startAddProduct(formData, reset));
    //             dispatch(startListProducts())
    //         }
    //     }else{
    //         // Validate each input
    //     validateInput('productName', productName);
    //     validateInput('category', category);
    //     validateInput('price', price);
    //     validateInput('quantity', quantity);

    //     }
    // }

    const handle_submit = (e) => {
        e.preventDefault();

        // Validate all fields
        validateInput('productName', productName);
        validateInput('category', category);
        validateInput('price', price);
        validateInput('quantity', quantity);

        // Check if there are any validation errors
        const hasErrors = Object.values(errors).some((error) => error);

        if (!hasErrors) {
            const formData = {
                name: productName,
                category,
                price,
                quantity
            };

            if (data) {
                // Update existing product
                dispatch(startUpdateProduct(data._id, formData));
            } else if (Object.values(errors).length > 0) {
                // Add new product
                dispatch(startAddProduct(formData,resetForm));
            } else {
                // Validate each input
                validateInput('productName', productName);
                validateInput('category', category);
                validateInput('price', price);
                validateInput('quantity', quantity);
            }

            //close modal
            if (onClose) onClose();
           // dispatch(startListProducts()); // Refresh product list
        }
    };

    // Function to reset form fields
    const resetForm = () => {
        setProductName('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setErrors({});
    }
    return (
        <div className="card mt-2">
            <h3>{data ? "" : "Add Product"}</h3>
            <div className="card-body">
                <form onSubmit={handle_submit} >
                    <div className="form-floating mb-3">
                        <input type="text" className={`form-control ${errors.productName ? 'is-invalid' : ''}`} id="productName" placeholder="product Name" value={productName} onChange={handle_change} onBlur={handleblur} />
                        <label htmlFor="productName">product Name</label>
                        {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className={`form-control ${errors.category ? 'is-invalid' : ''}`} id="category" placeholder="category" value={category} onChange={handle_change} onBlur={handleblur} />
                        <label htmlFor="category">category</label>
                        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className={`form-control ${errors.price ? 'is-invalid' : ''}`} id="price" placeholder="price" value={price} onChange={handle_change} onBlur={handleblur} />
                        <label htmlFor="price">price</label>
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} id="quantity" placeholder="quantity" value={quantity} onChange={handle_change} onBlur={handleblur} />
                        <label htmlFor="quantity">quantity</label>
                        {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                    </div>
                    <div className="d-flex justify-content-end"><button type="submit" className=" btn
                    btn-primary">{data ? "Edit" : "Submit"}</button></div>
                </form>
            </div>
        </div>
    )
}
export default Form