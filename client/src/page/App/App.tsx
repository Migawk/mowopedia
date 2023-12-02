import styles from "./app.module.css";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <main className={styles.main}>
      <img src="/background.gif" className={styles.backgroundImg}/>
      <section className={styles.modal}>
        <h1>Mowopedia</h1>
        <p>A little project for showing and<br/>explaining languages in internet.</p>
        <div className={styles.modalBottom}>
          <Link to="/wikia">Wikia</Link>
          <Link to="/map">Map</Link>
        </div>
      </section>
    </main>
  )
}
