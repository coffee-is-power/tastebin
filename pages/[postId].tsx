import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from 'swr'
import styles from '@/styles/post.module.css'
import ToolBox from "@/components/ToolBox";

interface PostComponentProps {
    postId: string;
    content: string;
}
const fetcher = (url: string) => fetch(url).then(r => r.text())

function usePost(postId: string){
    const { data, error } = useSWR("/api/post/"+postId, fetcher)
    return {
        content: data,
        isLoading: !error && !data,
        error
    }
}
export default function Post(props: PostComponentProps){
    const router = useRouter()
    const {postId} = router.query
    const {content, isLoading, error} = usePost(postId as string)
    if(error){
        return (
            <main>
                Error while fetching data: {JSON.stringify(error, null, 2)}
            </main>
        )
    }
    if(isLoading){
        return <main>
            Loading!
        </main>
    }
    return (
        <>
            <Head>
                <title>TasteBin - {postId}</title>
            </Head>
            <ToolBox viewingPost/>
            <main style={{display:"flex"}}>
                <code style={{paddingTop: "13px", paddingRight:"20px", paddingLeft: "10px"}}>{content?.split("\n").map((_, i) => <>{i}<br/></>)}</code>
                <code className={styles.content} id="content">
                    <pre>
                        {content}
                    </pre>
                </code>
            </main>
        </>
    )
}
