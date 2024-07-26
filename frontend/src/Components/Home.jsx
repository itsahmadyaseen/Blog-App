import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/api/v1/blogs/get-blogs");
        setBlogs(response.data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} onClick={() => handleBlogClick(blog._id)}>
              <BlogCard title={blog.title} thumbnail={blog.thumbnail} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;



/// import { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import BlogCard from "./BlogCard";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axiosInstance";

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axiosInstance.get(
//           "http://localhost:3000/api/v1/blogs/get-blogs"
//         );
//         // Log the response to check the format
//         console.log(response.data);
//         const fetchedBlogs = response.data.data;
//         // Ensure fetchedBlogs is an array

//         setBlogs(fetchedBlogs);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//         setBlogs([]); // Set to empty array in case of error
//       }
//     };

//     fetchBlogs();
//   }, [navigate]);

//   const blogDetails = async (id) => {
//     // console.log("id", id);
//     const response = await axiosInstance.get(
//       `http://localhost:3000/api/v1/blogs/get-blog/${id}`
//     );
//     // console.log("response", response.data);
//     navigate(`/blog/${id}`, { state: { blog: response.data } });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             // eslint-disable-next-line react/jsx-key
//             <div key={blog._id} onClick={() => blogDetails(blog._id)}>
//               <BlogCard
//                 title={blog.title}
//                 thumbnail={blog.thumbnail}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
