import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { collection, addDoc,updateDoc,doc } from "firebase/firestore";
import { fireBaseConnectionInstance } from "helpers";
import Button from "@mui/material/Button";
import { useGetBlogsState } from "hooks";
import BlogDispatcher from "redux/dispatchers/blogDispatcher";
import { AppConstants } from "constants/AppConstants";

export function TextEditor(props) {
  const editorRef = useRef(null);
  const {intialEditorValue,blogType,blogId} =  useGetBlogsState()
  console.log(intialEditorValue,blogType,blogId)
  const { title } = props;

  const publishBlog = async () => {
    const { db } = fireBaseConnectionInstance();
    if (editorRef.current) {
      const data = editorRef.current.getContent();
      try {
        const docRef = await addDoc(collection(db, "blogs"), {
          Title: title,
          Body: data
        });
        BlogDispatcher.resetEditorText()
        alert("Document written with ID: ", docRef.id);
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }
  };
  const updateBlog = async(docId)=>{
  const docRef = doc('blogs',docId)
  if(editorRef.current){
  const data = editorRef.current.getContent();
  updateDoc(docRef,{Title:title,Body:data}).then(()=>{
    BlogDispatcher.resetEditorText()
    alert("Blog has beeen Updated Successfully")
  }).catch(err=>{
    console.log(err)
  })
 }

  }
  return (
    <>
      <div style={{ margin: "auto" }}>
        <Editor
          apiKey="ogjzq7lo8j6i0zyghx5aywo8teuel8y56dblwh6cjnwyj8wh"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`${intialEditorValue}`}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount"
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | link image | table",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
        />
        <Button variant="contained" color="primary" onClick={()=>{
          blogType===AppConstants.CREATE_BLOG?publishBlog():updateBlog(blogId)
        }}>
          Publish Blog
        </Button>
      </div>
    </>
  );
}
