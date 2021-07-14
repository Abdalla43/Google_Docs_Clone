import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { EditorState,convertFromRaw,convertToRaw } from "draft-js";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
const Editor = dynamic(() => import('react-draft-wysiwyg').then(module => module.Editor), {
    ssr: false
})

function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [session]=useSession()
    const router=useRouter()
    const {id}=router.query;

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        db.collection('userDocs').doc(session.user.email).collection('docs').doc(id).set({
            editorState:convertToRaw(editorState.getCurrentContent())

        },{
            merge:true
        })
    }
    const [snapshot] = useDocumentOnce(
        db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
      );
    
      useEffect(() => {
        if (snapshot?.data()?.editorState) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(snapshot?.data()?.editorState)
            )
          );
        }
      }, [snapshot]);
    return (
        <div className='bg-[#F8F9FA] pb-16 min-h-screen'>
            <Editor
                editorState={editorState}
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
                editorClassName="mx-auto mt-6 bg-white shadow-lg max-w-5xl p-10 mb-6 border"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

export default TextEditor
