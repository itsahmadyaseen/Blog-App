import express from "express";
import cors from "cors";
import { connection } from "./database/connection.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import likeRouter from "./routes/like.routes.js";
import commentRouter from "./routes/comments.routes.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-journal.vercel.app",
];

app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


dotenv.config();
app.use(express.json());
connection();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("jbadw");
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
