import styles from "../wikia.module.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "preact/hooks";
import { markText } from "../../../helpers/text.ts";
import Header from "../components/Header.tsx";
import IPage from "../../type/page.ts";

interface IMessage {
  status: "good" | "moderate" | "bad"
  content: string
}

export default function Page({edit=false}: {edit?: boolean}) {
  const { pageName } = useParams();
  const [ message, setMessage ] = useState<IMessage | null>(null);
  const [ page, setPage ] = useState<IPage | 404>({
    id: null,
    name: null,
    content: null,
    keywords: null,
    editable: null
  });
  const keywordsList = useRef(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL + "/page/" + pageName)
    .then(res => res.json())
    .then(res => {
      setPage(res);
    })
    .catch(() => {
      setPage(404);
    });
  }, []);

  useEffect(() => {
    console.log(page);
  }, [page])

  function sendPage(e) {
    e.preventDefault();
    const keywords = Array.from(document.getElementsByName("keyword"))
      .map(el => el.value).join(" ");
    const content = document.getElementById("content").textContent;

    const body = {
      keywords,
      content
    };
    fetch(import.meta.env.VITE_SERVER_URL+"/page/"+page.name, {
      body: JSON.stringify(body),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then((res) => {
      if(!res.statusCode && res.id) {
        setMessage({
          status: "good",
          content: <p>
          Edits have been commited.
          </p>
        });
      }
      if(res?.statusCode === 404) {
        body.name = pageName;

        fetch(import.meta.env.VITE_SERVER_URL+"/page/", {
          body: JSON.stringify(body),
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res1 => res1.json()).then((res1) => {
          setMessage({
              status: "good",
              content: <p>
                The page <b>"{pageName}"</b> successfully created, you can come and&nbsp;
                <Link to={"/wikia/"+pageName}>look at page here.</Link>
              </p>
          })
        }).catch(err => {
          setMessage({
            status: "bad",
            content: <p>
              Someting went wrong. Stand by.
            </p>
          })
        });
      }
      if(res?.statusCode === 403) {
        setMessage({
          status: "bad",
          content: <p>
          Not allowed to edit.
          </p>
        })
      }
      if(res?.statusCode === 400) {
        setMessage({
            status: "bad",
            content: <p>
              There aren't edits commited.
            </p>
        });
      }
    });
  }

  return (
    <main className={styles.main}>
    <Header/>
    {
      page === null && <section><p>Loading...</p></section>
    }
    {
      page === 404 && !edit && <section className={styles.articleData}>
        <h1>404</h1>
        <h4>
          We couldn't find the page
          <br/>
          <Link to="edit">You can create it</Link>
        </h4>
      </section>
    }
    {
      message !== null && <section
        id="message"
        className={
          [styles["message" + message.status], styles.message].join(" ")
        }>
          {message.content}
      </section>
    }
    { // standart
      page.id && !edit &&  <section className={styles.articleData}>
        <div className={styles.articleTop}>
          <h1>
            {page.name[0].toUpperCase() + page.name.slice(1)}
          </h1>
          <Link to="edit">[edit]</Link>
        </div>
        <p dangerouslySetInnerHTML={{__html: markText(page.content)}}></p>
        <ul className={styles.keywords}>
          {
            page.keywords ? page.keywords.split(" ").map(keyword => {
              return <li key={keyword}>{keyword}</li>
            }) : <p>There aren't keywords.</p>
          }
        </ul>
      </section>
    }
    { // editing
      edit && <section className={styles.articleData}>
        <form onSubmit={sendPage}>
          <div className={styles.articleTop}>
            <h1>
              {pageName[0].toUpperCase()+pageName.slice(1)}
            </h1>
          </div>
          {page.content && page.content.length === 0 && <h2>Content:</h2>}
          <p
            className={styles.field}
            id="content"
            contenteditable>
            {page.content && page.content}
          </p>
          <br/>
          <ul className={styles.keywords} ref={keywordsList}>
            {
              page.keywords && page.keywords.split(" ").map(keyword => {
                return <li key={keyword} className={styles.keyword}>
                  <button
                    className={styles.keywordClose}
                    type="button"
                    onClick={() => {
                      let keywords = page.keywords
                        .split(" ")
                        .filter(el => el !== keyword)
                        .join(" ");
                      if(keywords.length === 0) keywords = null;

                      setPage(pr => {
                        return {
                          ...pr,
                          keywords
                        }
                      });
                    }}
                    >X</button>
                  <input
                    name="keyword"
                    value={keyword}
                    className={styles.keywordField}
                    />
                </li>
              })
            }
            <li>
              <button
                className="styledButton"
                type="button"
                onClick={() => {
                const list = [];
                Array.from(keywordsList.current.children).forEach(listEl => {
                  const el = listEl.children[1];
                  if(el == undefined || el?.localName !== "input") return;
                  list.push(el.value);
                });
                list.push("New_Keyword");

                setPage(pr => {
                  return {
                    ...pr,
                    keywords: Array.from(new Set(list)).join(" ")
                  }
                })
              }}>add +</button>
            </li>
          </ul>
          <div className={styles.buttons}>
            <h2>Actions</h2>
            <div className={styles.buttonsList}>
            <button
            className="styledButton"
            disabled={page !== 404 && page?.editable !== "GUEST"}>
              Change
            </button>
            <button
            className="styledButton"
            disabled>
              Delete
            </button>
            <button
            className="styledButton"
            disabled>
              Change permissions
            </button>
            <button
            className="styledButton"
            disabled>
              "Roll back"
            </button>
            </div>
          </div>
        </form>
      </section>
    }
    </main>
  )
}
