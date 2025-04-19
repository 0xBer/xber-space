import style from "./Emoticons.module.scss";

function Emoticons() {
    return (
        <div className={style.emoticonsWrapper}>
            <div className={style.switches}>
                <ul>
                    <li>Emoji</li>
                    <li>Stickers</li>
                    <li>GIFs</li>
                </ul>
            </div>
        </div>
    )
}

export default Emoticons