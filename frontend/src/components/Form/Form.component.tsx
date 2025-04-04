import styles from "./Form.module.scss";

function Form() {
    return (
        <>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <label htmlFor="mailorname">Name/email</label>
                    <input type="text" id="mailorname" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
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