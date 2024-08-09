import { useEffect } from "react"
import token_check from "./helper_Function/token_check"

const Home = () => {
    useEffect(() => {
        token_check()
      }, [])
    return (
        <h1>Home page</h1>
    )
}

export default Home