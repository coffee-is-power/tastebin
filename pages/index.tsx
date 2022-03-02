import Head from "next/head";
import styles from "@/styles/index.module.css";
import ToolBox from "@/components/ToolBox";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { text } = router.query;

  return (
    <>
      <Head>
        <title>TasteBin - Criar</title>
      </Head>
      <ToolBox />
      <main style={{ display: "flex" }}>
        <pre
          spellCheck={false}
          placeholder="Write some text/code"
          id="content"
          className={styles.content}
          contentEditable
        >
          {text || null}
        </pre>
      </main>
    </>
  );
}
