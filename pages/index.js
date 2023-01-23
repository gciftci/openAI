import Head from "next/head";
import { ChangeEvent, useState } from "react";
import styles from "./index.module.css";
const fs = require("fs/promises");
const React = require("react");

function FileUploadSingle() {
  const [result, setResult] = useState();
  const [document, setDocument] = useState();
  async function onSubmit(event) {
    event.preventDefault();
    console.dir(document.files[0]);
    const content = await fs.readFileSync(document.files[0], "utf8");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ input: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResult(data.result);
      setDocument(document);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult("data.result");
    } catch (error) {
      // TypeError: Failed to fetch
      console.log("There was an error", error);
    }
  }
  return (
    <div>
      <Head>
        <title>UploadFile</title>
      </Head>

      <main className={styles.main}>
        <h3>UploadFile</h3>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            multiple
            id="document"
            name="file"
            content="FileUploader"
            onChange={(e) => setDocument(e.target)}
          />
          <input type="submit" value="Generate"></input>
        </form>
        </br>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
export default FileUploadSingle;
