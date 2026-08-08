import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweet,
  createTweetReplay,
  getTweetReplay,
  updateTweet,
  getTweetByUser,
} from "../controllers/TweetsController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllTweets);
router.get("/:id", getTweet);
router.get("/replay/:id", getTweetReplay);
router.get("/user/:id", getTweetByUser);
router.put("/uploadTweetImage", upload.single("tweetImage"), updateTweet);
router.delete("/:id", deleteTweet);
router.post("/:id", upload.single("tweetImage"), createTweet);
router.post("/replay/:id", upload.single("tweetImage"), createTweetReplay);

export default router;
