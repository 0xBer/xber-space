import styles from "./Form.module.scss";

function Form() {
    return (
        <>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <label htmlFor="mailorname">Name/email</label>
                    <input type="text" id="mailorname" />
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