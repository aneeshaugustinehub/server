import { log } from "console";
import Tweets from "../models/Tweets.js";
import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "node:console";

export async function getAllTweets(_, res) {
  try {
    const tweets = await Tweets.find().sort({ createdAt: -1 });
    res.status(200).json({ tweets });
    if (!tweets) {
      res.status(404).json({ message: "tweets not available" });
    }
  } catch (error) {
    console.error("error in getAllTweets", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function getTweet(req, res) {
  try {
    const id = req.params.id;
    const tweets = await Tweets.findById(id);
    return res.status(200).json({ tweets });
    console.log(res);

    if (!tweets) {
      return res.status(404).json({ message: "tweets not available" });
    }
  } catch (error) {
    console.error("error in getTweet", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function getTweetByUser(req, res) {
  try {
    const id = req.params.id;
    const tweets = await Tweets.find({ postedBy: id }).sort({ createdAt: -1 });
    if (!tweets) {
      return res.status(404).json({ message: "tweets not available" });
    }
    return res.status(200).json({ tweets });
  } catch (error) {
    console.error("error in getTweet", error);
    return res.status(500).json({ message: "internal server error" });
  }
}
export async function getTweetReplay(req, res) {
  try {
    const id = req.params.id;
    const tweets = await Tweets.find({ replayId: id }).sort({ createdAt: -1 });
    if (!tweets) {
      return res.status(404).json({ message: "tweets not available" });
    }
    return res.status(200).json({ tweets });
  } catch (error) {
    console.error("error in getTweet", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

// Security Note on req.params.id: Pulling the postedBy ID from the URL
// parameters (e.g., /users/:id/tweets) works, but if you have authentication
// set up, it is generally safer to pull the ID from the authenticated user's
// token (often attached as req.user.id by auth middleware). This prevents a
// user from creating a tweet under someone else's ID by just manipulating the
// URL. If you aren't at the authentication stage yet, your current method is
// perfectly fine for testing!

export async function createTweet(req, res) {
  console.log("createTweet");
  try {
    const postedBy = req.params.id;
    const { Description, imagePath } = req.body;
    // console.log(imageUrl,Description,imagePath);
    // console.log(req.body,"res");
    let imageUrl = "";
    if (!Description && !req.file) {
      return res
        .status(400)
        .json({ message: "Tweet description or image is required." });
    }
    if (req.file) {
      // console.log(req.file,"file");
      imageUrl = `${req.file.filename}`;
    }
    // console.log("tweet created", postedBy, Description, imageUrl);
    const newTweet = new Tweets({
      postedBy: postedBy,
      description: Description,
      imagePath: imageUrl,
    });
    await newTweet.save();
    return res.status(200).json(newTweet);
  } catch (error) {
    console.error("error in createTweet", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createTweetReplay(req, res) {
  console.log("createTweetReplay");
  try {
    const { postedBy, replayText, replayImage } = req.body;
    console.log(postedBy, replayText, replayImage);
    let imageUrl = "";
    if (!postedBy) {
      return res.status(400).json({ message: "userid is required" });
    }
    if (!replayText && !req.file) {
      return res
        .status(400)
        .json({ message: "Tweet description or image is required." });
    }
    if (req.file) {
      imageUrl = `${req.file.filename}`;
    }
    const newTweet = new Tweets({
      replayId: req.params.id,
      postedBy: postedBy,
      description: replayText,
      imagePath: imageUrl,
    });
    console.log(newTweet);
    await newTweet.save();
    return res.status(200).json(newTweet);
  } catch (error) {
    console.error("error in createTweet", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateTweet(req, res) {
  console.log("updateTweet");
  try {
    const postedBy = req.params.id;
    const { Description, imagePath } = req.body;
    if (!description && !imagePath) {
      return res
        .status(400)
        .json({ message: "Tweet description or image is required." });
    }
    const updateTweet = await Tweets.findByIdAndUpdate(
      req.params.id,
      { postedBy, description, imagePath },
      { new: true },
    );
    res.status(200).json(updateTweet);
    if (!updateTweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }
  } catch (error) {
    console.error("error in updateTweet", error);
    res.status(500).json({ message: "internal server error" });
  }
}

const uploadsDir = path.join(process.cwd(), "assets/tweetsImage");

export async function deleteTweet(req, res) {
  console.log("deleteTweet");

  try {
    const DeleteTweet = await Tweets.findByIdAndDelete(req.params.id);

    if (!DeleteTweet)
      return res.status(404).json({ message: "Tweet not found" });

    if (DeleteTweet.imagePath) {
      const filename = path.basename(DeleteTweet.imagePath);
      const filePath = path.join(uploadsDir, filename);

      try {
        await fs.unlink(filePath);
        console.log("File deleted successfully");
      } catch (unlinkErr) {
        console.error("Could not delete image file:", unlinkErr.message);
      }
    }
    res.status(200).json({ message: "Tweet deleted" });
  } catch (error) {
    console.error("error in deleteTweet", error);
    res.status(500).json({ message: "internal server error" });
  }
}
