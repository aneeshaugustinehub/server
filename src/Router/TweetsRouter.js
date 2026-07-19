import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
  updateTweet,
  getTweetByUser,
} from "../controllers/TweetsController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllTweets);
router.get("/:id", getTweet);
router.get("/user/:id", getTweetByUser);
router.put("/uploadTweetImage", upload.single("tweetImage"), updateTweet);
router.delete("/:id", deleteTweet);
router.post("/:id", upload.single("tweetImage"), createTweet);

export default router;
