import mongoose from 'mongoose';
const {Schema} = mongoose;

// 1. Define the Schema
const userSchema = new Schema(
    {
      userId: {type: String, required: true, unique: true, trim: true},
      createdAt: {type: Date, default: Date.now},
      name: {type: String, required: true, trim: true},
      email: {type: String, required: true, unique: true, lowercase: true},
      bio: {type: String, maxlength: 160},
      noTweets: {type: Number, default: 0},
      noFollowers: {type: Number, default: 0},
      noFollowing: {type: Number, default: 0},
      age: {type: Number, min: 18, max: 65},
      roles: {type: [String], default: ['user']},
      token: {type: String, required: true},
    },
    {
      timestamps:
          true  // Automatically creates 'createdAt' and 'updatedAt' fields
    });

// 2. Compile the Schema into a Model
const User = mongoose.model('User', userSchema);

export default User;