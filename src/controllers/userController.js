import User from "../models/User.js";
import upload from "../middlewares/upload.js";

export async function getUser(req, res) {
  try {
    const Id = req.params.id;
    const user = await User.findOne({ userId: Id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID '' not found.`,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("error in getUser", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function getUserById(req, res) {
  try {
    const Id = req.params.id;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID '' not found.`,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("error in getUser", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function getUsers(_, res) {
  try {
    const user = await User.find();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `User not found.` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("error in getUser", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function createUser(req, res) {
  try {
    const { userId, createdAt, name, email, token, dob } = req.body;
    const newUser = new User({ userId, createdAt, name, email, token, dob });
    await newUser.save();
    res.status(200).json({ newUser, message: "user created successfully" });
  } catch (error) {
    console.error("error in createUser", error);
    res.status(500).json({ message: "internal server error", error });
  }
}
export async function updateUser(req, res) {
  try {
    const { userId, name, email, bio, location, website, age } = req.body;
    const profileImageUrl = req.files?.profilePic?.[0]?.filename;
    const bannerImageUrl = req.files?.bannerPic?.[0]?.filename;

    // if (!req.files) {
    //   return res.status(400).json({ message: "No file uploaded" });
    // }

    const updateFields = {
      userId,
      name,
      bio,
      location,
      website,
      age,
      ...(profileImageUrl && { profilePic: profileImageUrl }),
      ...(bannerImageUrl && { bannerPic: bannerImageUrl }),
    };
    console.log(updateFields);
    

    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateFields },
      { returnDocument: "after" },
    );

    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("error in updateUser", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function deleteUser(req, res) {
  try {
    const DeleteUser = await User.findByIdAndDelete(req.params.id);
    if (!DeleteUser) return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    console.error("error in deleteUser", error);
    res.status(500).json({ message: "internal server error" });
  }
}
