import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

const Comment = ({ blogId, userId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/v1/comments/${blogId}/comments`
        );
        const data = response.data.data;
        console.log("response", data);
        setComments(data);
      } catch (error) {
        console.log("Error fetching comments g", error);
      }
    };
    fetchComments();
  }, [blogId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("new comment", newComments);
    try {
      await axiosInstance.post(
        `http://localhost:3000/api/v1/comments/${blogId}/comment`,
        { content: newComment }
      );
      // console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      // console.log(commentId, "commentId");
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
      console.log("Error deleting comment", error);
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
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border border-black rounded-md p-1 bg-gray-500 ml-2 text-white"
            required
          />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
        {comments.map((comment) => (
          <div key={comment._id} className="flex justify-between">
            <div className="bg-white  flex justify-around rounded-lg shadow-md overflow-hidden m- p-3">
              <h3 className=" text-md">{comment.content}</h3>
            </div>
            {comment.userId._id !== userId && (
              <h5 className="">~{comment.userId.fullname}</h5>
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
