import Like from "../models/like.model.js";
import Blog from "../models/blog.model.js";

export const addLike = async (req, res) => {
  console.log("inside addd like");
  const { blogId } = req.params;
  if (!blogId) {
    console.log("Provide blog id", id);
    return res.status(400).json({ message: "Provide blog id", data: null });
  }
  const userId = req.user.id;
  console.log(blogId, userId);

  try {
    const existingLike = await Like.findOne({ blogId, userId });
    if (existingLike) {
      console.log("User already liked", existingLike);
      return res
        .status(400)
        .json({ message: "User already liked", data: existingLike });
    }

    const like = new Like({
      blogId: blogId,
      userId: userId,
    });
    await like.save();

    await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } });

    console.log("Like added");
    return res.status(200).json({ message: "Like added", data: like });
  } catch (error) {
    console.log("Error adding like", error);
    return res.status(500).json({ message: "Error adding Like", data: error });
  }
};

export const removeLike = async (req, res) => {
  const { blogId } = req.params;
  if (!blogId) {
    console.log("Provide blog id", id);
    return res.status(400).json({ message: "Provide blog id", data: null });
  }
  const userId = req.user.id;

  try {
    const existingLike = await Like.findOneAndDelete({ blogId, userId });
    if (!existingLike) {
      console.log("User not liked", existingLike);
      return res
        .status(400)
        .json({ message: "User not liked", data: existingLike });
    }

    await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: -1 } });

    console.log("Like removed");
    return res.status(200).json({ message: "User already liked" });
  } catch (error) {
    console.log("Error removing like", error);
    return res
      .status(500)
      .json({ message: "Error removing Like", data: error });
  }
};

export const getLikesForBlog = async (req, res) => {
  const { blogId } = req.params;
  console.log("blogId", blogId);
  if (!blogId) {
    console.log("Provide blog id", id);
    return res.status(400).json({ message: "Provide blog id" });
  }
  const userId = req.user.id;
  // console.log("userId, ", userId);

  try {
    const likes = await Like.find({ blogId, userId });
    console.log("Like fetched");
    return res.status(200).json({ message: "Likes fetched", data: likes });
  } catch (error) {
    console.log("Error fetching likes", error);
    return res
      .status(500)
      .json({ message: "Error fetching Like", data: error });
  }
};
