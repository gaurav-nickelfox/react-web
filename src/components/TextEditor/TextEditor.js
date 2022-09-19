import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { fireBaseConnectionInstance } from "helpers";
import Button from "@mui/material/Button";
import { useGetBlogsState } from "hooks";
import BlogDispatcher from "redux/dispatchers/blogDispatcher";
import { AppConstants } from "constants/AppConstants";
import { toast } from "react-toastify";

export function TextEditor() {
  const editorRef = useRef(null);
  const { intialEditorValue, blogType, blogId, blogTitle } = useGetBlogsState();
  const { db } = fireBaseConnectionInstance();

  const publishBlog = async () => {
    const { db } = fireBaseConnectionInstance();
    if (editorRef.current) {
      const data = editorRef.current.getContent();
      try {
        await addDoc(collection(db, "blogs"), {
          Title: blogTitle,
          Body: data
        });
        BlogDispatcher.resetEditorState();
        toast("Published Successfully!", { type: "success" });
      } catch (error) {
        console.log(error);
        alert("Error publishing blog: ", error);
      }
    }
  };
  const updateBlog = async (docId) => {
    const docRef = doc(db, "blogs", docId);
    if (editorRef.current) {
      const data = editorRef.current.getContent();
      updateDoc(docRef, { Title: blogTitle, Body: data })
        .then(() => {
          BlogDispatcher.resetEditorState();
          toast("Blog has beeen Updated Successfully!", { type: "success" });
        })
        .catch((err) => {
          console.log(err);
          toast("Error updating the blog Please try again...", {
            type: "success"
          });
        });
    }
  };
  useEffect(()=>{
    console.log("component render")
  })
  return (
    <>
      <div style={{ margin: "auto" }}>
        <Editor
          apiKey={process.env.EDITOR_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`${intialEditorValue}`}
          init={{
            height: 450,
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            blogType === AppConstants.UPDATE_BLOG
              ? updateBlog(blogId)
              : publishBlog();
          }}>
          Publish Blog
        </Button>
      </div>
    </>
  );
}
