import style from './Body.module.scss'

function Body() {
    return (
        <div className={style.inp}>
            <form action="">
                <textarea name="text" wrap='' />
            </form>
        </div>

    )
}

export default Body;