import LoginForm from "./pages/LoginForm/Login.page";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chats } from "./pages/Home/Chats.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<LoginForm />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
