import React, { useState, useEffect } from "react";
import { fireBaseConnectionInstance } from "helpers";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useHistory } from "react-router-dom";
import BlogDispatcher from "redux/dispatchers/blogDispatcher";
import { AppConstants } from "constants/AppConstants";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Bloglist() {
  const [blogslist, setblogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { db } = fireBaseConnectionInstance();
  const history = useHistory();

  const navigateToDashboard = (route, blogId) => {
    const { Body, Title } = blogslist.find((list) => list.id === blogId);
    BlogDispatcher.setBlogDetails({
      intialEditorValue: Body,
      blogTitle: Title,
      blogId,
      blogType: AppConstants.UPDATE_BLOG
    });
    history.push(route);
  };

  useEffect(() => {
    const blogsList = [];
    const getBlogsCollectionData = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        blogsList.push({ ...doc.data(), id: doc.id });
      });
      setblogs(blogsList);
      setLoading(false);
    };
    getBlogsCollectionData();
  }, []);

  const deleteBlog = (id) => {
    const docRef = doc(db, "blogs", id);
    deleteDoc(docRef)
      .then(() => {
        const updatedBlogList = blogslist.filter((list) => list.id !== id);
        setblogs(updatedBlogList);
        toast("Blog successfully deleted!", { type: "success" });
      })
      .catch((error) => {
        console.log(error);
        toast("Error deleting Blog", { type: "error" });
      });
  };

  if (loading) {
    return (
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        py={17}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div>
      <Typography paddingLeft={3} variant="h2" component="h2">
        All Blog List
      </Typography>
      {blogslist.map((blog) => (
        <Card style={{ margin: "20px" }} variant="outlined" key={blog.id}>
          <CardHeader title={`Blog Title : ${blog.Title}`} />
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              id={blog.id}>
              <div
                style={{ alignSelf: "flex-start" }}
                dangerouslySetInnerHTML={{ __html: blog.Body }}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignSelf: "flex-end"
                }}>
                <Button
                  variant="contained"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    navigateToDashboard("/u/dashboard", blog.id);
                  }}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    deleteBlog(blog.id);
                  }}>
                  delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Bloglist;
