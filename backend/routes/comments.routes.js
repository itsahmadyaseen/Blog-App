import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addComment,
  getCommentsForBlog,
  removeComment,
} from "../controller/comment.controller.js";

const router = new Router();

router.post("/:blogId/comment", verifyJWT, addComment);
router.delete("/:blogId/comment", verifyJWT, removeComment);
router.get("/:blogId/comments", verifyJWT, getCommentsForBlog);

export default router;
