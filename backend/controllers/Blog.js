import blogModel from "../models/blog.js";

const createBlog = async (req, res) => {
    try {
        const { title, content, writer } = req.body;

        const imagePath = 'upload' + (req.file ? req.file.path.split('upload')[1].replace(/\\/g, '/') : "");

        const blog = new blogModel({
            title,
            content,
            writer,
            image: imagePath,
        });
        await blog.save();
        res.status(201).json({ success: true, message: "Blog Created", blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Failed to create blog" });
    }

};

const getAllBlogs = async (req, res) => {
    try {
        const allblogs = await blogModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, allblogs });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Failed to fetch blogs" });
    }
};

const deleteBlog = async (req, res) => {
    console.log("delete blog called");

    try {
        const { id } = req.params;
        await blogModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Blog Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: "Failed to delete blog" });
    }
};


export { createBlog, getAllBlogs, deleteBlog };