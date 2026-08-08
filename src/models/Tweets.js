import mongoose from "mongoose";
const { Schema } = mongoose;

// 1. Define the Schema
const tweets = new Schema(
  {
    // Id: {type: String, required: true, unique: true, trim: true},
    createdAt: { type: Date, default: Date.now },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    replayId: { type: String, required: false, trim: true },
    description: { type: String, required: false, maxlength: 280 },
    imagePath: { type: String, trim: true },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    commentCount: { type: Number, default: 0 },
    retweetCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

// 2. Compile the Schema into a Model
const Tweets = mongoose.model("Tweets", tweets);

export default Tweets;
