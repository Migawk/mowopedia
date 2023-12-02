import { Link } from "react-router-dom";
import styles from "../wikia.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/wikia">
        <h1>Mowopedia<span className={styles.wikia}>.Wikia</span></h1>
      </Link>
      <nav className={styles.headerNav}>
        <Link to="/">Main</Link>
        <Link to="/map">Map</Link>
      </nav>
    </header>
  )
}
