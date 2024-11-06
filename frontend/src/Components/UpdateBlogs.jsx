import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../axiosInstance";

const UpdateBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/v1/blogs/get-blog/${id}`
        );
        const fetchedBlog = response.data.data;
        console.log(fetchedBlog.thumbnail);
        console.log(fetchedBlog.title);
        setBlog(fetchedBlog);
        setTitle(fetchedBlog.title);
        setDescription(fetchedBlog.description);
        setThumbnail(fetchedBlog.thumbnail);
        setAuthor(fetchedBlog.author);
      } catch (error) {
        console.error("Error fetching blog details", error);
        navigate("/unauthorized");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    console.log("thumbnail here", thumbnail);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      console.log("id", id);
      await axiosInstance.patch(
        `http://localhost:3000/api/v1/blogs/update-blog/${id}`,
        formData
      );
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog", error);
    }
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
          <h1 className="text-3xl font-bold mb-4">Update Blog</h1>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Author
              </label>
              <textarea
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="thumbnail"
              >
                Thumbnail
              </label>
              <input
                id="thumbnail"
                type="file"
                onChange={(e) => {
                  console.log("there", e.target.files[0]);
                  setThumbnail(e.target.files[0]);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {thumbnail && typeof thumbnail === "string" && (
                <img
                  src={thumbnail}
                  alt="Current Thumbnail"
                  className="w-full h-auto mt-4"
                />
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-800 rounded p-2 text-white"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
