import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { startPostUsers } from '../actions/user_Action'

const Register = (props) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const fullNameinput = useRef()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({ ...formData, [id]: value })

        // If it's an onBlur event, validate the input
        if (e.type === 'blur') {
            validateInput(id, value)
        }
    }

    const validateInput = (id, value) => {
        let error = ''

        if (id === 'fullName') {
            if (value.trim().length === 0) {
                error = 'Full Name cannot be empty'
            }
        }

        if (id === 'email') {
            if (value.trim().length === 0) {
                error = 'Email cannot be empty'
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) {
                    error = 'Invalid email format'
                }
            }
        }

        if (id === 'password') {
            if (value.trim().length === 0) {
                error = "Password cannot be empty"
            } else if (value.length < 8 || value.length > 128) {
                error = "Password length is too short"
            }
        }

        setErrors(prevErrors => ({ ...prevErrors, [id]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate all fields on submit
        validateInput('fullName', formData.fullName)
        validateInput('email', formData.email)
        validateInput('password', formData.password)

        if (Object.values(errors).some(error => error)) {
            alert('Please add credential.')
            return
        }

        dispatch(startPostUsers(formData, props))
    }

    useEffect(() => {
        fullNameinput.current.focus()
    }, [])

    return (
        <div className='container fluid'>
            <div className='col-md-8'>
                <center><h1>Register</h1></center>
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        ref={fullNameinput}
                        value={formData.fullName}
                        className="form-control"
                        placeholder="Enter Full Name"
                        style={{ width: 200 }}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.fullName && <span style={{ color: "red" }}>{errors.fullName}</span>}
                    <br />
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                       
                        className="form-control"
                        minLength={8}
                        maxLength={128}
                        placeholder="Enter email"
                        style={{ width: 200 }}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                    <br />
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        autoComplete='on'
                        value={formData.password}
                        className="form-control"
                        placeholder="Enter Password"
                        style={{ width: 200 }}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                    <br />
                    <input type="submit" value='Submit' className="btn btn-primary" />
                </form>
            </div>
        </div>
    )
}

export default Register
