import User from "../User/User.component"
import style from "./Panel.module.scss"

const users = [
    {
        username: "John Doe",
        avatar: "../../../public/images.jpg"
    },
    {
        username: "Joe Smith",
        avatar: "../../../public/images.jpg"
    }
]

function Panel() {
    return (
        <>
            <div className={style.panel}>
                <ul>
                    {users.map(user => (
                        <li key={Math.random()}>
                            <User img={user.avatar} name={user.username} />
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}

export default Panel