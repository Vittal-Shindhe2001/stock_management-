
import { Route,Redirect } from "react-router-dom/cjs/react-router-dom.min"
const PrivateRoute = ({component:Component, ...rest})=>{
    return (
        <Route
            {...rest}
            render = {(props)=>{
                return localStorage.getItem("token")?(
                    <Component
                        {...props} 
                        
                    />
                ):
                <Redirect
                    to={{
                        pathname:"/login"
                    }}
                />
            }}
        />
    )
}

export default PrivateRoute