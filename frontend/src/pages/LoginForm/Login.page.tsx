import "./Login.modules.scss";
import axios from "../../axios";
import { useState } from "react";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const handleFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = axios.post("/auth/login", {
                username,
                password,
            });

            console.log(response)
        } catch (error) {
            setVisibility(true);
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
                        onChange={(e) => setUsername(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Password"
                        required value={password}
                        onChange={(e) => setPass(e.target.value)} />
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