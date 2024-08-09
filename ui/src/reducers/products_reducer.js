// products reducer

import { ADD_PRODUCT, DELETE_PRODUCT, ERROR, GET_DELETED_PRODUCT, GET_PRODUCT, LIST_PRODUCTS, UNDO, UPDATE_PRODUCT } from "../actions/products_action"

const initialstate = { data: [], error: "" }

const product_reducer = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            return { ...state, data: action.payload, error: "" }

        }
        case GET_PRODUCT: {
            return { ...state, data: action.payload, error: "" }
        }
        case LIST_PRODUCTS: {
            return { ...state, data: action.payload, error: "" }
        }
        case DELETE_PRODUCT: {
            const updatedData = state.data.filter(ele => ele._id !== action.payload);
            return { ...state, data: updatedData, error: '' }
        }

        case UPDATE_PRODUCT: {
            const updatedData = state.data.map(ele => {
                if (ele._id === action.payload._id) {
                    return { ...ele, ...action.payload }
                }
                return ele;
            })
            return { ...state, data: updatedData, error: '' }
        }
        case UNDO: {
            const updatedData = state.data.filter(ele => ele._id !== action.payload._id)    
            return { ...state, data: updatedData, error: '' }
        }
        case GET_DELETED_PRODUCT: {
            return { ...state, data: action.payload, error: "" }
        }

        case ERROR: {
            return { ...state, error: action.payload }
        }



        default:
            {
                return { ...state }
            }
    }
}

export default product_reducer