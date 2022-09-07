import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { collection, addDoc } from "firebase/firestore";
import { fireBaseConnectionInstance } from "helpers";
import Button from "@mui/material/Button";

export function TextEditor() {
  const editorRef = useRef(null);

  const publishBlog = async() => {
    const { db } = fireBaseConnectionInstance();
    if (editorRef.current) {
      const data = editorRef.current.getContent();
      try {
        const docRef = await addDoc(collection(db, "blogs"), {
          Body: data
        });
        alert("Document written with ID: ", docRef.id);
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }
  };
  return (
    <>
      <div style={{ margin: "auto" }}>
        <Editor
          apiKey="ogjzq7lo8j6i0zyghx5aywo8teuel8y56dblwh6cjnwyj8wh"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`<p><a title="image_address" href="https://www.shutterstock.com/image-photo/aerial-view-floating-water-scooter-blue-1492736684">This is the new link that has been genearted&nbsp;</a></p>`}
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
        <Button variant="contained" color="primary" onClick={publishBlog}>Publish Blog</Button>
      </div>
    </>
  );
}
