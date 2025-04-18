import style from "./User.module.scss";

function User({ img, name }: any) {
    return (
        <img src={img} alt="" title={name} />
    )
}

export default User