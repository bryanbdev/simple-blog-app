import express from "express";
const router = express.Router();
import {
  getAllBlogs,
  createNewBlog,
  getBlogCreateForm,
  updateSpecificBlog,
  getSpecificBlog,
  deleteSpecificBlog,
  currentBlog,
} from "../controllers/blogController.js";

// BLOG ROUTES

// get blogs home page
router.get("/", getAllBlogs);

// get request for creating a blog
router.get("/blog/create", getBlogCreateForm);

// post requset to create a new blog
router.post("/blog/create", createNewBlog);

// get request to current blog
router.get("/blog/:id/", currentBlog);

// get request to specific blog to update
router.get("/blog/:id/update", getSpecificBlog);

// update request to specific blog
router.put("/blog/:id/update", updateSpecificBlog);

// delete request for specific blog
router.delete("/blog/:id", deleteSpecificBlog);

export default router;
