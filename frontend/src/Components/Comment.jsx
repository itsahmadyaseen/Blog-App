import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

const Comment = ({ blogId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/v1/comments/${blogId}/comments`
        );
        const data = response.data.data;
        console.log("Fetched comments:", data);
        setComments(data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `http://localhost:3000/api/v1/comments/${blogId}/comment`,
        { content: newComment }
      );
      const addedComment = response.data.data; // assuming response contains the new comment data
      setComments((prev) => [...prev, addedComment]);
      setNewComment(""); // Clear the input field after adding
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.delete(
        `http://localhost:3000/api/v1/comments/${blogId}/comment`,
        {
          data: {
            commentId: commentId,
          },
        }
      );
      setComments((prev) => prev.filter((comm) => comm._id !== commentId));
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-8">
        <h1 className="font-bold text-2xl">Comments</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border border-black rounded-md p-1 bg-gray-500 ml-2 text-white"
            required
            placeholder="Add a comment"
          />
          <button
            className="border border-black rounded-md p-1 ml-2"
            type="submit"
          >
            Add Comment
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex justify-between items-center bg-white rounded-lg shadow-md p-3"
          >
            <h3 className="text-md">{comment.content}</h3>
            {comment.userId._id !== userId && (
              <h5 className="text-gray-600">~{comment.userId.fullname}</h5>
            )}
            {comment.userId._id === userId && (
              <button
                className="border border-black rounded-md p-1 h-10"
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
