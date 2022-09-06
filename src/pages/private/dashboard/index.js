import React from "react";
import Button from "@mui/material/Button";
import {TextEditor} from "../../../components"

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="contained">Hello World</Button>
      <TextEditor/>
    </div>
  );
}

export default Dashboard;
