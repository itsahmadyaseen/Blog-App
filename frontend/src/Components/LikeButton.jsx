/* eslint-disable react/prop-types */
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";

const LikeButton = ({ blogId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const checkIfLiked = async () => {
      const likeResponse = await axiosInstance.get(
        `http://localhost:3000/api/v1/likes/${blogId}/get-likes`
      );
      const userliked = likeResponse.data.data.some(
        (like) => like.userId === userId
      );
      const blogResponse = await axiosInstance.get(
        `http://localhost:3000/api/v1/blogs/get-blog/${blogId}`
      );
      console.log(blogResponse.data.data.likesCount);
      setLikesCount(blogResponse.data.data.likesCount);
      console.log(userliked);
      setLiked(userliked);
    };
    checkIfLiked();
  }, [blogId, userId]);

  const toggleLike = async () => {
    try {
      if (liked) {
        await axiosInstance.delete(
          `http://localhost:3000/api/v1/likes/${blogId}/like`
        );
        setLikesCount(likesCount - 1);
      } else {
        await axiosInstance.post(
          `http://localhost:3000/api/v1/likes/${blogId}/like`
        );
        setLikesCount(likesCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.log("Error toggling like", error);
    }
  };

  return (
    <div>
      <button
        className="border border-black rounded-md p-1 h-10 w-16"
        onClick={toggleLike}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <span className="m-4 text-2xl">{likesCount}</span>
    </div>
  );
};

export default LikeButton;
