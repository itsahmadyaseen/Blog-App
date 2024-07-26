
import { Router } from "express";
import { getUsers, loginUser, signupUser } from "../controller/user.controller.js";

const router = Router();

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/get-users', getUsers)

export default router;