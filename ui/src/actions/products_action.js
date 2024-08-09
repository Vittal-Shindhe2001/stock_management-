// Products action
import token_check from "../components/helper_Function/token_check"
import axios from "../config_axios/axios"
import Swal from "sweetalert2"
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const LIST_PRODUCTS = 'LIST_PRODUCTS'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const GET_PRODUCT = 'GET_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ERROR = 'ERROR'
export const UNDO = 'UNDO'
export const GET_DELETED_PRODUCT = "GET_DELETED_PRODUCT"

export const set_error = (data) => {
    return {
        type: ERROR,
        payload: data
    }
}

// Add product
export const set_add_product = (data) => {
    return {
        type: ADD_PRODUCT,
        payload: data
    }
}

export const startAddProduct = (formData, reset) => {
    return (dispatch) => {
        (async () => {
            try {
                const response = await axios.post('/products', formData, { headers: { 'authorization': localStorage.getItem('token') } })
                if (response.data.message === "jwt expired") {
                    token_check()
                }
                else {
                    reset()
                    dispatch(set_add_product(response.data))
                    // Show success alert
                    Swal.fire({
                        icon: 'success',
                        title: 'Product added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (err) {
                if (err.response && err.response.status === 409) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Product already exists',

                    })
                    dispatch(set_error(err.message))
                } else {
                    dispatch(set_error(err.message))
                    // Show error alert
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to add product',
                        text: err.message,
                        confirmButtonText: 'Try Again'
                    });
                }

            }
        })()
    }
}

// Get product
export const set_get_product = (data) => {
    return {
        type: GET_PRODUCT,
        payload: data
    }
}

export const startGetProduct = (productId) => {
    return (dispatch) => {
        (async () => {
            try {
                const response = await axios.get(`/products/${productId}`, { headers: { 'authorization': localStorage.getItem('token') } })
                if (response.data) {
                    dispatch(set_list_products(response.data))
                }
            } catch (error) {
                dispatch(set_error(error.message))
            }
        })()
    }
}

// Get all products
export const set_list_products = (data) => {
    return {
        type: LIST_PRODUCTS,
        payload: data
    }
}

export const startListProducts = () => {
    return (dispatch) => {
        (async () => {
            try {
                const response = await axios.get('/products/list', { headers: { 'authorization': localStorage.getItem('token') } })
                if (response.data.message === "jwt expired") {
                    token_check()
                    // // Token expired, log out the user
                    // localStorage.clear()
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Session Expired',
                    //     text: 'Your session has expired. Please log in again.',
                    //     confirmButtonText: 'OK'
                    // }).then(() => {
                    //     window.location.href = '/login' // Redirect to login page
                    // });
                } else {
                    dispatch(set_list_products(response.data))
                }
            } catch (error) {
                dispatch(set_error(error.message))
            }
        })()
    }
}

// Update product
export const set_update_product = (data) => {
    return {
        type: UPDATE_PRODUCT,
        payload: data
    }
}

export const startUpdateProduct = (productId, updatedData) => {
    console.log(productId);

    return (dispatch) => {
        (async () => {
            try {
                const response = await axios.put(`/products/${productId}`, updatedData, { headers: { 'authorization': localStorage.getItem('token') } })
                dispatch(set_update_product(response.data))
            } catch (error) {
                dispatch(set_error(error.message))
            }
        })()
    }
}

// Delete product
export const set_delete_product = (productId) => {
    return {
        type: DELETE_PRODUCT,
        payload: productId
    }
}

export const startDeleteProduct = (productId) => {
    return (dispatch) => {
        (async () => {
            try {
                const res = await axios.delete(`/products/${productId}`, { headers: { 'authorization': localStorage.getItem('token') } })
                if (res.data) {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            dispatch(set_delete_product(productId))
                        }
                    });
                }
            } catch (error) {
                dispatch(set_error(error.message))
            }
        })()
    }
}

export const set_undo_product = (data) => {
    return {
        type: UNDO,
        payload: data
    }
}

export const startUpdateUndoProduct = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const response = await axios.put(`/products/undo/${id}`, { isDelete: false }, { headers: { 'authorization': localStorage.getItem('token') } })
                    dispatch(set_undo_product(response.data))
                } catch (error) {
                    console.log(error.error);

                    dispatch(set_error(error))
                }
            }
        )()
    }
}

export const set_deleted_product = (data) => {
    return {
        type: GET_DELETED_PRODUCT,
        payload: data
    }
}

export const startGetDeletedProduct = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const response = await axios.get('/products/deleted', { headers: { 'authorization': localStorage.getItem('token') } })
                    dispatch(set_deleted_product(response.data))
                } catch (error) {
                    dispatch(set_error(error))
                }
            }
        )()
    }
}