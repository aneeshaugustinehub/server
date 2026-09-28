import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  createPostReplay,
  getPostReplay,
  updatePost,
  getPostByUser,
} from "../controllers/PostController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.get("/replay/:id", getPostReplay);
router.get("/user/:id", getPostByUser);
router.put("/uploadPostImage", upload.single("PostImage"), updatePost);
router.delete("/:id", deletePost);
router.post("/:id", upload.single("PostImage"), createPost);
router.post("/replay/:id", upload.single("PostImage"), createPostReplay);

export default router;
