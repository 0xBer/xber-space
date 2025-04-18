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
            <div className="panel">
                <ul>
                    {users.map(user => (
                        <li>
                            <User className="user" img={user.avatar} name={user.username} />
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}

export default Panel