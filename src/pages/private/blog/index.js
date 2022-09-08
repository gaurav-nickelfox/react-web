import React, { useState, useEffect } from "react";
import { fireBaseConnectionInstance } from "helpers";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Button from "@mui/material/Button";
import CardHeader from '@mui/material/CardHeader';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useHistory } from "react-router-dom";
import BlogDispatcher from "redux/dispatchers/blogDispatcher";
import { AppConstants } from "constants/AppConstants";
import { toast } from 'react-toastify';

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
        toast("Blog successfully deleted!",{type:'success'});
      })
      .catch((error) => {
        console.log(error);
        toast("Error deleting Blog",{type:'error'});
      });
  };

  if (loading) {
    return <h1>Loading firebase data content......</h1>;
  }
  return (
    <div>
      <h2>All blogs List</h2>
      {blogslist.map((blog) => (
        <Card style={{ margin: "20px" }} variant="outlined" key={blog.id}>
          <CardHeader title ={`Blog Title : ${blog.Title}`}/>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              id={blog.id}>
              <div dangerouslySetInnerHTML={{ __html: blog.Body }}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minWidth: "15%"
                }}>
                <Button
                  variant="contained"
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
