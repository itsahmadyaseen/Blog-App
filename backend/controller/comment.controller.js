import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
  const { content } = req.body;
  const { blogId } = req.params;
  const userId = req.user.id;

  if (!content || !blogId || !userId) {
    console.log("Provide all details", content, blogId, userId);
    return res.status(400).json({ message: "Provide all details", data: null });
  }

  try {
    const comment = new Comment({
      content: content,
      blogId: blogId,
      userId: userId,
    });

    await comment.save();

    console.log("Comment added");
    return res.status(200).json({ message: "Comment added" });
  } catch (error) {
    console.log("Error creating comment", error);
    return res
      .status(500)
      .json({ message: "Error creating comment", data: error });
  }
};

export const removeComment = async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user.id;
  const { commentId } = req.body;

  if (!blogId || !userId || !commentId) {
    console.log("Provide all details", blogId, userId, commentId);
    return res.status(400).json({ message: "Provide all details" });
  }

  try {
    await Comment.findByIdAndDelete(commentId);
    console.log("Comment removed");
    return res.status(200).json({ message: "Comment removed" });
  } catch (error) {
    console.log("Error removing comment", error);
    return res
      .status(500)
      .json({ message: "Error removing comment", data: error });
  }
};

export const getCommentsForBlog = async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user.id;
  if (!blogId || !userId) {
    console.log("Provide all details", blogId, userId);
    return res.status(400).json({ message: "Provide all details", data: null });
  }
  try {
    const comments = await Comment.find({ blogId }).populate(
      "userId",
      "fullname"
    );
    console.log("Comment fetched");
    return res.status(200).json({ message: "Comment fetched", data: comments });
  } catch (error) {
    console.log("Error fetching comment", error);
    return res
      .status(500)
      .json({ message: "Error fetching comment", data: error });
  }
};
