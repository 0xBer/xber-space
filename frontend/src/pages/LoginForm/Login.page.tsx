import "./Login.modules.scss";

function LoginPage() {
    return (
        <>
            <div className="form">
                <form className="loginForm">
                    <input type="text" placeholder="Username, email" required />
                    <input type="password" placeholder="Password" required />
                    <button>Log in</button>
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