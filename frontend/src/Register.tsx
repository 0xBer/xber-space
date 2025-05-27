import { useState, type SyntheticEvent } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();
      console.log(login, password);

      try {
        const res = await axios.post('/auth/register', {
          username: login,
          password,
        });
      
        if (res.status === 200) {
          console.log("success");
          return navigate("/select-chat");
        }
      } catch (error) {
        console.error(`Error ${error}`);
      }
    }

    return (
        <>
          <h2>Register:</h2>
          <form onSubmit={handleSubmit}>
            <input placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}/>
            <input type='' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Register</button>
          </form>
          <h4>Have an account? <a href="/login">Login</a></h4>
        </>
      )
}

export default Register