import express from "express";
import { createBlog, deleteBlog, getAllBlogs } from "../controllers/Blog.js";
import { blogUpload, upload } from "../config/multer.js";   

const blogRouter = express.Router();

blogRouter.post('/addBlog', blogUpload.single("blogImage"), createBlog);
blogRouter.get('/allBlogs', getAllBlogs);
blogRouter.delete('/deleteBlog/:id', deleteBlog);
export default blogRouter;