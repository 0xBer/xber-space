import { useNavigate } from "react-router-dom";
import { useState, type SyntheticEvent } from "react"
import axios from './axios.ts';

function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', {
        username: login,
        password,
      });
  
      console.log(res);
      if (res.status === 200) {
        return navigate("/select-chat");
      }
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  return (
    <>
      <h2>Login:</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)}/>
        <input type='' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Sign in</button>
      </form>
      <h4>Or <a href="/register">register</a></h4>
    </>
  )
}

export default App
