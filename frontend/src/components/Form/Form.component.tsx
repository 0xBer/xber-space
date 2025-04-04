import { useState } from "react";
import styles from "./Form.module.scss";

function Form() {
    const [pass, setPass] = useState(true);

    return (
        <>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <label htmlFor="mailorname">Name/email</label>
                    <input type="text" id="mailorname" />
                    <label htmlFor="password">Password</label>
                    <input type={pass ? 'password' : 'text'} id="password" />
                    <div>
                        <input onClick={() => setPass(!pass)} type="checkbox" name="type" id="setType" />
                        <label htmlFor="setType">Show password</label>
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </form>
        </>
    )
}

export default Form;