import LoginForm from "./pages/LoginForm/Login.page";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
