import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";

export const createBlog = async (req, res) => {
  const { title, description, author } = req.body;
  // console.log('title', title);
  if (!title || !description || !author) {
    console.log("Provide all details", title, description, author);
    return res.status(400).json({ message: "Provide all details" });
  }
  try {
    // console.log('id', req.user);
    const userId = req.user.id;

    const thumbnailLocalPath = req.file?.path;
    if (!thumbnailLocalPath) {
      console.log("Cannot get local file path", thumbnailLocalPath);
      return res.status(400).json({
        message: "Cannot get local file path",
        data: thumbnailLocalPath,
      });
    }

    const thumbnailPath = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnailPath) console.log("Cannot get thumbnail path");

    const newBlog = new Blog({
      title: title,
      description: description,
      thumbnail: thumbnailPath,
      author: author,
      userId: userId,
    });
    await newBlog.save();
    console.log("Blog created");
    return res.status(201).json({ message: "Blog created" });
  } catch (error) {
    console.log("Error creating blog", error);
    return res
      .status(400)
      .json({ message: "Error creating blog", data: error });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    console.log(blogs);
    if (!blogs || blogs.length === 0) {
      console.log("Cannot find blogs");
      return res.status(404).json({ message: "Cannot find blogs" });
    }

    console.log("Blogs fetched");
    return res.status(200).json({ message: "Users fetched", data: blogs });
  } catch (error) {
    console.log("Error fetching users", error);
    return res
      .status(500)
      .json({ message: "Error fetching users", data: error });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;
    console.log("userid", userId);
    console.log("blogid", blogId);
    const blogDetails = await Blog.findById(blogId);
    console.log(blogDetails.userId, userId);
    if (!blogDetails.userId.equals(userId)) {
      console.log("Dont have authorization to delete other's blogs");
      return res.status(403).json({
        message: "Dont have authorization to delete other's blogs",
        data: null,
      });
    }

    if (!blogDetails) {
      console.log("Cannot find blog", blogDetails);
      return res
        .status(404)
        .json({ message: "Cannot find blog", data: blogDetails });
    }

    if (blogDetails.imagePublicId) {
      const deleteImageResult = await deleteOnCloudinary(
        blogDetails.imagePublicId
      );
      if (deleteImageResult.result !== "ok") {
        console.log("Failed to delete image on Cloudinary", deleteImageResult);
        return res.status(500).json({
          message: "Failed to delete image on Cloudinary",
          data: deleteImageResult,
        });
      }
    }

    await Blog.findByIdAndDelete(blogId);
    console.log("Blog deleted");
    return res.status(200).json({ message: "Blog Deleted" });
  } catch (error) {
    console.log("Unable to delete Blog", error);
    return res
      .status(500)
      .json({ message: "Unable to delete Blog", data: error });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author } = req.body;
    console.log("inside here");

    console.log(" all details", { id, title, description, author });

    if (!id || !title || !description || !author) {
      return res.status(400).json({ message: "Provide all details" });
    }

    const blogDetails = await Blog.findById(id);
    if (!blogDetails) {
      console.log("Blog not found");
      return res.status(404).json({ message: "Blog not found" });
    }

    let thumbnailPath;
    if (req.file) {
      const thumbnailLocalPath = req.file.path;
      if (!thumbnailLocalPath) {
        console.log("Cannot get local file path", thumbnailLocalPath);
        return res.status(400).json({
          message: "Cannot get local file path",
          data: thumbnailLocalPath,
        });
      }

      thumbnailPath = await uploadOnCloudinary(thumbnailLocalPath);
      if (!thumbnailPath) {
        console.log("Cannot get thumbnail path from Cloudinary");
        return res.status(500).json({ message: "Thumbnail upload failed" });
      }
    }

    const updatedBlogData = {
      title,
      description,
      author,
      thumbnail: thumbnailPath,
    };

    const response = await Blog.findByIdAndUpdate(
      id,
      { $set: updatedBlogData },
      { new: true }
    );

    if (!response) {
      console.log("Blog update failed");
      return res.status(500).json({ message: "Blog update failed" });
    }

    console.log("Blog updated");
    return res.status(200).json({ message: "Blog updated" });
  } catch (error) {
    console.error("Blog updation failed", error);
    return res
      .status(500)
      .json({ message: "Blog updation failed", data: error });
  }
};

export const getBlogById = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    console.log("iiid", id);
    const getBlog = await Blog.findById(id);
    if (!getBlog) {
      console.log("Blog fetch failed ", getBlog);
      return res.status(404).json({ message: "Blog fetch failed" });
    }
    console.log("Blog fetched");
    return res.status(200).json({ data: getBlog, userId: req.user.id });
  } catch (error) {
    console.log("Blog fetch failed ", error);
    return res.status(500).json(error.message);
  }
};

export const getPersonalBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({ userId: userId });
    if (!blogs) {
      console.log("Cannot get blogs for user", blogs);
      return res.status(404).json("Cannot get blogs for user", blogs);
    }
    console.log("blogs");
    return res.status(200).json({ message: "Blogs Fetched", data: blogs });
  } catch (error) {
    console.log("Blog fetch failed ", error);
    return res.status(500).json(error.message);
  }
};
