import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/blogs/get-user-blogs`
        );
        const fetchedBlogs = response.data.data;

        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]); // Set to empty array in case of error
      }
    };

    fetchBlogs();
  }, [navigate]);

  const blogDetails = async (id) => {
    const response = await axiosInstance.get(
      `/api/v1/blogs/get-blog/${id}`
    );
    navigate(`/blog/${id}`, { state: { blog: response.data } });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            // eslint-disable-next-line react/jsx-key
            <div key={blog._id} onClick={() => blogDetails(blog._id)}>
              <BlogCard title={blog.title} thumbnail={blog.thumbnail} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
