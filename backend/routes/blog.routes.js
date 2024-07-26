import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  getPersonalBlogs,
  updateBlog,
} from "../controller/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/create-blog", verifyJWT, upload.single("thumbnail"), createBlog);
router.get("/get-blogs", verifyJWT, getBlogs);
router.delete("/delete-blog/:id", verifyJWT, deleteBlog);
router.patch(
  "/update-blog/:id",

  verifyJWT,
  upload.single("thumbnail"),
  updateBlog
);
router.get("/get-blog/:id", verifyJWT, getBlogById);
router.get("/get-user-blogs/:id", verifyJWT, getPersonalBlogs);

export default router;
