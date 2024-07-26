import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addLike,
  getLikesForBlog,
  removeLike,
} from "../controller/like.controller.js";

const router = new Router();

router.post("/:blogId/like", verifyJWT, addLike);
router.delete("/:blogId/like", verifyJWT, removeLike);
router.get("/:blogId/get-likes", verifyJWT, getLikesForBlog);

export default router;
