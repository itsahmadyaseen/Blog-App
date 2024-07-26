import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

const Comment = ({ blogId, userId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/v1/comments/${blogId}/comments`
        );
        console.log("response", response.data.data);
        setComments(response.data.data);
      } catch (error) {
        console.log("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [blogId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("new comment", newComments);
    try {
      const response = await axiosInstance.post(
        `http://localhost:3000/api/v1/comments/${blogId}/comment`,
        { content: newComments }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
        
    } catch (error) {
        console.log('Error deleting comment', error);
    }
  };

  return (
    <div>
      <div className="flex gap-8">
        <h1 className="font-bold text-2xl">Comments</h1>
        <form onSubmit={handleSubmit}>
          <button className="border border-black rounded-md p-1 " type="submit">
            Add Comment
          </button>
          <input
            type="text"
            value={newComments}
            onChange={(e) => setNewComments(e.target.value)}
            className="bg-gray-500 text-white"
            required
          />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
        {comments.map((comment) => (
          <div key={comment._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden m- p-3">
              <h3 className=" text-md">{comment.content}</h3>
            </div>
            <button onClick={() => handleDelete(comment._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
