import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export function TextEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
              "removeformat | help | link image",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
        />
        <button onClick={log}>Log editor content</button>
      </div>
    </>
  );
}
