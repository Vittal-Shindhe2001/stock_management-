import axios from "../config_axios/axios"
import Swal from "sweetalert2"
export const GET_USER = 'GET_USER'
export const ADD_BUDGET = 'ADD_BUDGET'


export const startPostUsers = (formSubmit, props) => {
    return (dispatch) => {
        axios.post('/user/register', formSubmit)
            .then((res) => {
                if (res.status == 409) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'User already exists',
                        text: 'An account with this email or username already exists. Please try another one.',
                    })
                }
                else {
                    props.history.push('/login')
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                }
            }).catch((err) => {
                if (err.response && err.response.status === 409) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'User already exists',
                        text: 'An account with this email or username already exists. Please try another one.',
                    })
                } else {
                    // Handle other errors
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response ? err.response.data.message : 'Something went wrong!',
                    })
                }
            })
    }

}
export const startLoginUser = (formLogin, props, setIsLogin, setIsSubmitting) => {
    return () => {
        axios.post('/user/login', formLogin)
            .then((res) => {
                if (res.data.hasOwnProperty('error')) {
                    setIsSubmitting(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${JSON.stringify(res.data.error)}`,
                    })
                } else {
                    localStorage.setItem('token', res.data.token)
                    props.history.push('/')
                    setIsSubmitting(false)
                    setIsLogin(true)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Login success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((err) => {
                alert(err)
            });
    }
}

export const setGetUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}

export const startGetUser = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const res = await axios.get('/user/info', { headers: { 'authorization': localStorage.getItem('token') } })
                    dispatch(setGetUser(res.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}
