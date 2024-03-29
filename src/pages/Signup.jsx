import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";
import axios from "axios";
import("./signup.css");

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        name,
        password,
      });
      if (res.status === 201) {
        console.log("Signup response", res);
        nav("/login");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMsg("Account name already in use");
      } else {
        setErrorMsg("Something goes wrong, try again plz");
      }
    }
  };

  useEffect(() => {}, [errorMsg]);

  return (
    <div className="signup">
      <h2>Signup Page</h2>
      {errorMsg === "" ? <p></p> : <p className="errorMsg">{errorMsg}</p>}
      <form onSubmit={handleSignup}>
        <label className="signupLabel">
          Name
          <br />
          <input
            className="signupInput"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label className="signupLabel" htmlFor="Password">
          Password
          <br />
          <input
            className="signupInput"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="signupButton" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
