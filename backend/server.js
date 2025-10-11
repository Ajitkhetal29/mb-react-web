import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import adminRouter from "./routes/admin.js";
import projectRouter from "./routes/project.js";
import path from 'path'
import blogRouter from "./routes/blog.js";
import testimonialRouter from "./routes/testimonial.js";
import faqRouter from "./routes/faq.js";
import blogModel from "./models/blog.js";
import corsOptions from "./cors.js";

import fs from 'fs';
import { fileURLToPath } from 'url';

import dotenv from "dotenv"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(corsOptions)
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDb();

app.use('/',(req,res)=>{
    res.send("Hello from Backend")
    
})
app.use('/api/admin', adminRouter)
app.use('/api/project', projectRouter)
app.use('/api/blog', blogRouter)
app.use('/api/testimonial', testimonialRouter)
app.use('/api/faq', faqRouter)



app.listen(process.env.PORT, () => {
    console.log('Server is running ');
})

