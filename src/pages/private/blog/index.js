import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import fb from './firebase'
import { fireBaseConnectionInstance } from "helpers";
import { collection, getDocs } from "firebase/firestore";

// const Blogs = db.collection('blogs');

 function Bloglist() {
  const [blogslist, setblogs] = useState([]);
  const [loading,setLoading] = useState(true)

//  const getBlogsCollectionData = async()=>{
//  const { db } = fireBaseConnectionInstance();
//  const querySnapshot = await getDocs(collection(db, "blogs"));
//   querySnapshot.forEach((doc) => {
//     arrPost.push({...doc.data(),key:doc.id})
//  });
//   }
  useEffect(()=>{
    const arrPost = []
    const getBlogsCollectionData = async()=>{
        const { db } = fireBaseConnectionInstance();
        const querySnapshot = await getDocs(collection(db, "blogs"));
         querySnapshot.forEach((doc) => {
           arrPost.push({...doc.data(),id:doc.id})
        });
        setblogs(arrPost)
        setLoading(false);
         }
        getBlogsCollectionData();
      return ()=> getBlogsCollectionData()
  },[])


  const DeleteBlog = (id) => {
    Blogs.doc(id)
      .delete()
      .then(() => {
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
 console.log(blogslist)
 if(loading){
    return(<h1>Loading firebase data content......</h1>)
 }
  return (
    <div>
      <h2 className="w-full text-center font-bold text-xl">All blogs List</h2>
      {blogslist.map((blog) => (
        <div key={blog.id}>
          <p>body: {blog.Body} </p>
          <Link
            to={"/blog/" + blog.id}
            class="mr-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 border border-indigo-500 rounded">
            View
          </Link>
          <Link
            to={"/blog/edit/" + blog.id}
            class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
            Edit
          </Link>
          <button
            onClick={() => {
              DeleteBlog(blog.id);
            }}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Bloglist
