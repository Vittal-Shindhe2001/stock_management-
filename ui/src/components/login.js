import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoginUser } from "../actions/user_Action";
function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false); // button disabled
   console.log(isSubmitting);
    const error = {}
    const emailInput = useRef()
    const dispatch = useDispatch()

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    //form validation
    const formvalidation = () => {
        if (email.trim().length === 0) {
            error.email = 'Please Enter Your Email'
        }

        if (password.trim().length === 0) {
            error.password = "Please Enter Your password"
        }
    }
    // const handleSubmit = (e) => {
    //     // setMessageError({})
    //     e.preventDefault()
    //     formvalidation()
    //     const formLogin = {
    //         email: email,
    //         password: password
    //     }
    //     if (Object.keys(error).length === 0) {
    //         dispatch(startLoginUser(formLogin, props, props.setIsLogin))
    //     } else {
    //         setMessageError(error)
    //     }
    // }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        formvalidation();

        if (Object.keys(error).length === 0) {
            setIsSubmitting(true); // Disable the button during submission
            const formLogin = {
                email: email,
                password: password,
            };

            await dispatch(startLoginUser(formLogin, props, props.setIsLogin,setIsSubmitting));

        } else {
            setMessageError(error);
        }
    };
    //email focus useeffect
    useEffect(() => {
        emailInput.current.focus()
    }, [])
    return (
        <div className="container fuild">
            <div className="col-md-8">
                <center> <h1>Login</h1></center>
                <form onSubmit={handleSubmit}>
                    <label className="form-label" >Email </label>
                    <input type="email" value={email} ref={emailInput} className="form-control" placeholder="name@example.com" style={{ width: 200 }} onChange={handleEmail} />{messageError.email && <span style={{ color: "red" }}>{messageError.email}</span>} <br />
                    <label className="form-label">Password</label>
                    <input type="password" name="password" autoComplete="on" value={password} className="form-control" placeholder="Enter Your Password" style={{ width: 200 }} onChange={handlePassword} />{messageError.password && <div><span style={{ color: "red" }}>{messageError.password}</span><br /></div>}
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                        disabled={isSubmitting} 
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;