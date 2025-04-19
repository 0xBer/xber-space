import style from "./User.module.scss";

function User({ img, name }: any) {
    return (
        <div className={style.userWrapper}>
            <img src={img} alt="" title={name} />
        </div>
    )
}

export default User;