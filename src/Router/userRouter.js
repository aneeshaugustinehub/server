import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put(
  "/:id",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "bannerPic", maxCount: 1 },
  ]),
  updateUser,
);

export default router;
