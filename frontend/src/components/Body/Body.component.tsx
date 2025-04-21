import Message from '../Message/Message.component';
import style from './Body.module.scss'

function Body() {
    return (
        <>
            <form className={style.form} action="">
                <div className={style.messages}>
                    <Message />
                </div>
                <input type="text" />
            </form>
        </>


    )
}

export default Body;