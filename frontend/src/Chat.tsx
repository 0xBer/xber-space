import { useEffect, useState, type SyntheticEvent } from "react";
import { useParams } from "react-router-dom"


import { socket } from "./socket";
import axios from './axios';

function Chat() {
    const [chatName, setChatName] = useState('');
    const { chatId } = useParams();

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState(['Hello world']);
    
    useEffect(() => {
        const selectChat = async () => {
            try {
                const res: any = await axios.get(`/chat/${chatId}`);
                setChatName(res.data.chat.name);

                // socket
                socket.emit('join_chat', chatId);
            } catch (error) {
                console.error(error);
            }
        }; selectChat();
    }, [chatId]);

    useEffect(() => {
        const handler = (data: string) => {
            setChat((prev) => [...prev, data])
        }
        socket.on("receive_message", handler);

        return () => {
            socket.off("receive_message", handler)
        }
    }, [chat]);

    const sendMessage = (e: SyntheticEvent) => {
        e.preventDefault();
        socket.emit('send_message', {chatId, message});
        setMessage('');
    }
    
    return (
        <>
            <h2>Chat name: {chatName}</h2>
            <h2>Chat ID: {chatId}</h2>
            <form onSubmit={sendMessage}>
                <input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                />
                <button type="submit">Send message</button>
            </form>
            <ul>
                {chat.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
        </>
  )
}

export default Chat