import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
const token_check = () => {
    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in seconds
        return decodedToken.exp < currentTime;
    }
    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            // Token is missing or expired
            Swal.fire({
                icon: 'error',
                title: 'Session Expired',
                text: 'Your session has expired. Please log in again.',
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login' // Redirect to login page
            });
            // localStorage.removeItem('token')
            // localStorage.removeItem('refreshToken')
            // window.location.href = '/login'
        }
    }
    checkTokenValidity()
}

export default token_check