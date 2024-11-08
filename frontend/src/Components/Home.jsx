import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/api/v1/blogs/get-blogs"
        );
        setBlogs(response.data.data || []);
        setLoading(false);
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
      {loading && (
        <>
          <div>
            <h1 className="text-3xl font-bold ">Loading...</h1>
          </div>
        </>
      )}

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
