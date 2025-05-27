import { useState, type SyntheticEvent } from "react";

import axios from './axios';
import { useNavigate } from "react-router-dom";

function SelectChat() {
  const [chatId, setChatId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/chat/join', {
        chatId,
        password: password.length > 0 ? password : null,
      });
      console.log(res);
      navigate(`/chat/${res.data.chat}`);
    } catch (error) {
      
    }
  }

  return (
    <>
      <h2>Enter chat ID:</h2>
      <form onSubmit={handleSubmit}>
        <input 
                placeholder="Chat name"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
            />
            <input 
                placeholder="Chat Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        <button type="submit">Enter chat</button>
      </form>
      <h4>Or <a href="/create-chat">create chat</a></h4>
    </>
  )
}

export default SelectChat