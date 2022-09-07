import React, { useState, useEffect } from "react";
import { fireBaseConnectionInstance } from "helpers";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useHistory} from "react-router-dom"

// const Blogs = db.collection('blogs');

function Bloglist() {
  const [blogslist, setblogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { db } = fireBaseConnectionInstance();
  const history = useHistory();

  const navigateToDashboard=(route,blogId)=>{
    history.push(route,blogId)
  }

  //  const getBlogsCollectionData = async()=>{
  //  const { db } = fireBaseConnectionInstance();
  //  const querySnapshot = await getDocs(collection(db, "blogs"));
  //   querySnapshot.forEach((doc) => {
  //     arrPost.push({...doc.data(),key:doc.id})
  //  });
  //   }
  
  useEffect(() => {
    const arrPost = [];
    const getBlogsCollectionData = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        arrPost.push({ ...doc.data(), id: doc.id });
      });
      setblogs(arrPost);
      setLoading(false);
    };
    getBlogsCollectionData();
    return () => getBlogsCollectionData();
  }, []);

  const deleteBlog = (id) => {
    const docRef = doc(db, "blogs", id);
    deleteDoc(docRef)
      .then(() => {
        const updatedBlogList = blogslist.filter((list) => list.id !== id);
        setblogs(updatedBlogList);
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  //   useEffect(() => {
  //     // Subscribe to query with onSnapshot
  //     const unsubscribe = Blogs.limit(100).onSnapshot((querySnapshot) => {
  //       // Get all documents from collection - with IDs
  //       const data = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id
  //       }));
  //       console.log({data});
  //       // Update state
  //       setblogs(data);
  //     });

  //     // Detach listener
  //     return unsubscribe;
  //   }, []);
  console.log(blogslist);
  if (loading) {
    return <h1>Loading firebase data content......</h1>;
  }
  return (
    <div>
      <h2>All blogs List</h2>
      {blogslist.map((blog) => (
        <Card style={{ margin: "20px" }} variant="outlined" key={blog.id}>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              id={blog.id}>
              <div dangerouslySetInnerHTML={{ __html: blog.Body }}></div>
              <div style={{ display: "flex", justifyContent: "space-between",minWidth:'15%' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigateToDashboard("./u/dashboard",blog.id);
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
