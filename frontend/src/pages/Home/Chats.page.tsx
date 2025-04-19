import Body from "../../components/Body/Body.component";
import Emoticons from "../../components/Emoticons/Emoticons.component";
import Panel from "../../components/Panel/Panel";

import style from "./Chats.module.scss"

export function Chats() {
  return (
    <div className={style.scr}>
      <Panel />
      <Body />
      <Emoticons />
    </div>
  )
}