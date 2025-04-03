import styles from "./Header.module.scss";

export function Header() {
  return (
    <>
      <a className={styles.logo} href="/">
        <div>XBer</div>
      </a>
    </>
  )
}