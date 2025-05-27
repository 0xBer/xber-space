import { useState, type SyntheticEvent } from "react"
import axios from "./axios";
import { useNavigate } from "react-router-dom";

function CreateChat() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            const res = await axios.post('/chat/create', {
                name,
                password,
            });
            console.log(res)
            navigate(`/chat/${res.data.chat}`);
        } catch (error) {
            console.log("Error while creating chat", error);
        }
    }

    return (
    <>
        <h2>Enter chat ID:</h2>
        <form onSubmit={handleSubmit}>
            <input 
                placeholder="Chat name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                placeholder="Chat Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    </>
  )
}

export default CreateChat