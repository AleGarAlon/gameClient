import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";


function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const {authenticateUser} = useContext(AuthContext)
    const nav = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}/auth/login`, {
                name,
                password,
            })
            console.log("There is the Login response", data)
            localStorage.setItem("authToken", data.token)
            await authenticateUser();
            nav("/main")
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
        <h2>Login page</h2>
        <form onSubmit={handleLogin}>
            <label> Name
                <input type="text"
                    value={name}
                    required 
                    onChange={(e)=> setName(e.target.value)}/>
            </label>
            <label > Password
                <input type="text" 
                value={password} 
                required 
                onChange={(e)=> setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>

        </>
    )
}

export default Login;