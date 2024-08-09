import { useEffect, useState } from "react"
import { Link, Route, withRouter } from "react-router-dom/cjs/react-router-dom.min"
import Home from "./Home"
import DashBoard from "./StockList"
import Register from "./register"
import Login from "./login"

import PrivateRoute from "./helper_Function/PrivateRoute"
import About from "./About"
import Swal from "sweetalert2"
import Settings from "./Settings"
import StockPage from "./StockPage"
import token_check from "./helper_Function/token_check"
const Navbar = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true)
        }
    }, [])
    useEffect(() => {
        if (isLogin) {
            token_check()
        }
    }, [])
    return (
        <div>
            {isLogin ? <div className="container-fuild">
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "orange" }}>
                    <h1 className="navbar-brand"><span style={{ color: "purple" }}>Stock Managament</span></h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/'>Home </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/stocklist'>Stock List </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/stock-chart'>Stock Chart </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/about'>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/settings'>Settings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/' onClick={() => {
                                    localStorage.removeItem('token')
                                    setIsLogin(false)
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Logout success',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }}>LogOut</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div> :
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "orange" }}>
                    <h1 className="navbar-brand">Stock Managament</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to='/register'>Register </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to='/login'>Login </Link>
                            </li>
                        </ul>
                    </div>
                </nav>}
            <Route path="/register" component={Register} />
            <Route path="/login"
                render={(props) => (
                    <Login {...props} setIsLogin={setIsLogin} />
                )} />
            <PrivateRoute path="/stocklist" component={DashBoard} />
            <PrivateRoute path="/stock-chart" component={StockPage} />

            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/about" component={About} />
        </div>
    )
}
export default withRouter(Navbar)
