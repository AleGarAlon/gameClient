import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";
import axios from "axios";

function Signup() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5005/auth/signup`, 
            {
                name,
                password,
            });
            console.log("Signup response" , res);
            nav("/login");    
        }
        catch (error) {
            console.log (error)
        }
    }
    return (
        <>
        <h2>Signup Page</h2>
        <form onSubmit={handleSignup}>
            <label> Name
                <input type="text"
                 value={name} 
                 required 
                 onChange={(e) => setName(e.target.value)}
                 />
            </label>
            <label htmlFor="Password"> Password
                <input type="text"
                 value={password} 
                 required 
                 onChange={(e) => setPassword(e.target.value)}
                 />
            </label>
            <button type="submit">Signup</button>
        </form>
        </>

    )
}

export default Signup;