import Country from "./Country/Country.tsx";
import Header from "./components/Header.tsx";
import { useState, useEffect } from "preact/hooks";
import { Link } from "react-router-dom";
import IPage from "../../type/page.ts";
import styles from "./wikia.module.css";

export default function Wikia() {
  const [pages, setPages] = useState<IPage | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "/page/")
      .then(res => res.json())
      .then(res => {
        if(Array.isArray(res)) setPages(res);
      });
  }, []);

  return (
    <main className={styles.main}>
      <Header/>
      <section className={styles.articleData}>
        <h2>Welcome,</h2>
        <h3>here you can find information about each language and their dialect.</h3>
      </section>
      <section className={styles.articleData}>
        {
          pages && pages.map((page) =>{
            return <div key={page} className={styles.article}>
              <h2>
                <Link
                  to={"/wikia/"+page.name}>
                  {page.name.slice(0, 1).toUpperCase() + page.name.slice(1)}
                </Link>
              </h2>
              <p>
                {page.content.length > 256 ? page.content.slice(0, 253) + "..." : page.content}
              </p>
            </div>
          })
        }
      </section>
    </main>
  )
}
