import React,{useState} from "react";
import {TextEditor} from "../../../components"
import TextField from '@mui/material/TextField';

function Dashboard() {
  const [blogTitle,setBlogTitle] = useState('')
  const handleChange = (event)=>{
    setBlogTitle(event.target.value)
  }
  return (
    <div>
      <h1>Blog Dashboard</h1>
      <TextField placeholder="Enter Blog Title" onChange={handleChange} id="outlined-basic" label="Title" variant="outlined"/>
      <TextEditor title={blogTitle}/>
    </div>
  );
}

export default Dashboard;
