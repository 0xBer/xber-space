import User from "../User/User.component"

import style from "./Message.module.scss";

function Message() {
    return (
        <>
            <div className={`${style.message} ${style.sent}`}>
                <User img={"../../../public/images.jpg"} />
                <div className={style.msgText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, quo!</div>
            </div>
            <div className={style.message}>
                <User img={"../../../public/images.jpg"} />
                <div className={style.msgText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, quo!</div>
            </div>
        </>


    )
}

export default Message