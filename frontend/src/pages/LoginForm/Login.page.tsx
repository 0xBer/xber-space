import style from "./Login.module.scss";
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

            navigate("/chats");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={style.form}>
                <form className={style.loginForm} onSubmit={handleFormSubmit}>
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
                <div className={style.separator}>
                    <div className={style.line}>
                        <span>OR</span>
                    </div>

                </div>
                <a href="">Log in with Google</a>
            </div>
        </>
    )
}

export default LoginPage;