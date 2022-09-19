import React, { useEffect } from "react";
import { TextEditor } from "components/TextEditor/TextEditor";
import TextField from "@mui/material/TextField";
import BlogDispatcher from "redux/dispatchers/blogDispatcher";
import { useGetBlogsState } from "hooks";

function Dashboard() {
  const { blogTitle } = useGetBlogsState();
  const handleChange = (event) => {
    BlogDispatcher.setBlogTitle(event.target.value);
  };
  useEffect(() => {
    return () => BlogDispatcher.resetEditorState();
  }, []);

  return (
    <div>
      <h1>Blog Dashboard</h1>
      <TextField
        value={blogTitle}
        placeholder="Enter Blog Title"
        onChange={handleChange}
        id="outlined-basic"
        label="Title"
        variant="outlined"
      />
      <TextEditor />
    </div>
  );
}

export default Dashboard;
