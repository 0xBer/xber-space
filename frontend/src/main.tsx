import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.tsx'
import Register from './Register.tsx';
import SelectChat from './SelectChat.tsx';
import CreateChat from './CreateChat.tsx';
import Chat from './Chat.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<Navigate to="/login" replace/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/select-chat' element={<SelectChat />} />
      <Route path='/create-chat' element={<CreateChat />} />
      <Route path='/chat/:chatId' element={<Chat />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
