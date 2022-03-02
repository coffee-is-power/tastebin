
import { MouseEventHandler, useEffect, useState } from 'react';
import fetch from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileText, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
function urlSafe (str: string) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }
  
const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    (async () => {
      e.preventDefault()
      try {
        let contentElement: HTMLPreElement = document.querySelector("#content")!;
        let content = contentElement.innerText;
        let createPostRes = await fetch.post("/api/post", { content })
        let postId = createPostRes.data.id;
        window.location.href = "/"+postId
      } catch(e){}
    })()
  }
export default function ToolBox({viewingPost = false}: {viewingPost?: boolean}){
    const router = useRouter()
    const {postId} = router.query
    return (
        <div className="ToolBox">
            <style jsx>
                {
                    `
                    button, a {
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        font-size: 20px;
                        color: gray;
                        padding: 8px
                    }
                    .ToolBox {
                        background-color: rgba(0,0,0, 30%);
                        padding: 5px;
                    }
                    .ToolBar {
                        background-color: rgba(0,0,0, 50%);
                        padding: 4px;
                        margin-top: 4px
                    }
                    button:hover, a:hover {
                        color: white;
                    }
                    button:disabled {
                        color: #111111 !important;
                        cursor: unset !important;
                    }
                    div {
                        position: fixed;
                        margin-left: auto;
                        right: 0
                    }
                    `
                }
            </style>
            <h1>TasteBin</h1>
            <div className="ToolBar">
                
                <button onClick={onSubmit}>
                    <FontAwesomeIcon
                        icon={faFloppyDisk}
                    />
                </button>
                <Link href="/">
                    <a onClick={() => {
                        if(!viewingPost){
                            let contentElement = document.querySelector("#content");
                            (contentElement as HTMLPreElement).innerText = ""
                        }
                    }}>
                        <FontAwesomeIcon
                            icon={faPlus}
                        />
                    </a>
                </Link>
                <button
                    onClick={() => {
                        let contentElement = document.querySelector("#content");
                        window.location.href = "/?text="+urlSafe((contentElement as HTMLPreElement).innerText)
                    }}
                    disabled={!viewingPost}
                >
                    <FontAwesomeIcon
                        icon={faCopy}
                    />
                </button>
                <button
                    onClick={() => {
                        let contentElement = document.querySelector("#content");
                        window.location.href = "/api/post/"+postId
                    }}
                    disabled={!viewingPost}
                >
                    <FontAwesomeIcon
                        icon={faFileText}
                    />
                </button>
            </div>
        </div>
    )
}