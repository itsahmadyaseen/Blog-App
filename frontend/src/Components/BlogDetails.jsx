import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../axiosInstance";
import LikeButton from "./LikeButton";
import Comment from "./Comment";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/v1/blogs/get-blog/${id}`
        );
        // console.log(response.data.userId);
        setUserId(response.data.userId);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog details", error);
        navigate("/unauthorized");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const deleteBlog = async () => {
    try {
      await axiosInstance.delete(
        `http://localhost:3000/api/v1/blogs/delete-blog/${id}`
      );
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };
  const handleUpdateClick = (id) => {
    navigate(`/update-blog/${id}`);
  };

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-8">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-auto mb-4"
            style={{ maxWidth: "600px", maxHeight: "400px" }}
          />
          <p className="text-gray-700 mb-4 text-2xl">{blog.description}</p>
          <p className="text-gray-700 mb-4 text-1xl">By {blog.author}</p>
          <LikeButton blogId={blog._id} userId={userId}/>
          {userId == blog.userId && (
            <>
              <button
                className="bg-blue-800 rounded p-2 text-white"
                onClick={deleteBlog}
              >
                Delete Post
              </button>
              <button
                className="bg-blue-800 rounded p-2 text-white m-4"
                onClick={()=>handleUpdateClick(blog._id)}
              >
                Update Post
              </button>
            </>
          )}
          
          <Comment blogId={blog._id} userId={userId}/>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;

// // src/components/BlogDetails.jsx
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import Navbar from './Navbar';
// import axiosInstance from '../axiosInstance';
// import { useEffect, useState } from 'react';

// const BlogDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { blog: stateBlog, userId: loggedInUserId } = location.state || {};
//   const [blog, setBlog] = useState(stateBlog);
//   const [userId, setUserId] = useState(loggedInUserId);

//   useEffect(() => {
//     if (!blog) {
//       const fetchBlog = async () => {
//         try {
//           const response = await axiosInstance.get(`http://localhost:3000/api/v1/blogs/get-blog/${id}`);
//           console.log(response);
//           setBlog(response.data.blog);
//           setUserId(response.data.userId);
//         } catch (error) {
//           console.error('Error fetching blog details', error);
//           navigate('/unauthorized', { state: { from: location.pathname } });
//         }
//       };
//       fetchBlog();
//     }
//   }, [blog, id, navigate, location.pathname]);

//   const deleteBlog = async () => {
//     try {
//       await axiosInstance.delete(`http://localhost:3000/api/v1/blogs/delete-blog/${id}`);
//       console.log('Blog deleted');
//       navigate('/my-blogs');
//     } catch (error) {
//       console.error('Error deleting blog', error);
//     }
//   };

//   if (!blog) {
//     return (
//       <div>
//         <Navbar />
//         <div className="container mx-auto mt-8">
//           <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
//             <h1 className="text-3xl font-bold mb-4">Loading...</h1>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto mt-8">
//         <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//           <img
//             src={blog.thumbnail}
//             alt={blog.title}
//             className="w-full h-auto mb-4"
//             style={{ maxWidth: '600px', maxHeight: '400px' }}
//           />
//           <p className="text-gray-700 mb-4 text-2xl">Content: {blog.description}</p>
//           <p className="text-gray-700 mb-4 text-1xl">By {blog.author}</p>
//           {userId === blog.userId && ( // Check if logged-in user is the author
//             <button
//               className="bg-blue-800 rounded p-2 text-white"
//               onClick={deleteBlog}
//             >
//               Delete Post
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;
