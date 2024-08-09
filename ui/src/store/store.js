import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension' 
import userReducer from "../reducers/user_Reducer";
import product_reducer from "../reducers/products_reducer";
const configStore=()=>{
    const store=createStore(combineReducers({
        user:userReducer,
       products:product_reducer
    }),composeWithDevTools(applyMiddleware(thunk)))
    return store
}
export default configStore