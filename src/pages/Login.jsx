import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/Auth.context";
import("./login.css");

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { authenticateUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        name,
        password,
      });
      console.log("There is the Login response", data);
      localStorage.setItem("authToken", data.token);
      await authenticateUser();
      nav("/character");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h2>Login page</h2>
      <form onSubmit={handleLogin}>
        <label className="loginLabel">
          Name
          <br />
          <input
            className="loginInput"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label className="loginLabel">
          Password
          <br />
          <input
            className="loginInput"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
