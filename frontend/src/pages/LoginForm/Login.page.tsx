import "./Login.modules.scss";
import axios from "../../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/login", {
                username,
                password,
            });
            const token = response.data.token;

            localStorage.setItem("Auth", token);

            navigate("/home");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="form">
                <h1>
                    Xber
                </h1>
                <form className="loginForm" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Username, email"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <input type="submit" value="Log in"></input>
                </form>
                <div className="orDiv">
                    <hr />
                    <p>OR</p>
                    <a href="">Log in with Google</a>
                </div>
            </div>
        </>
    )
}

export default LoginPage;