import { ADD_BUDGET, GET_USER } from "../actions/user_Action"
const userintialState = { errors: '', data: {} }

const userReducer = (state = userintialState, action) => {
    switch (action.type) {
        case ADD_BUDGET: {
            return { ...state, data: action.payload }
        }
        case GET_USER: {
            return { ...state, data: action.payload }
        }
        default: {
            return { ...state }
        }

    }
}
export default userReducer