import LoginForm from "./pages/LoginForm/Login.page";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Home/Main.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<LoginForm />} />
        <Route path="/chats" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
