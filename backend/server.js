import express from "express";
import cors from "cors";
import corsOptions from "./cors.js"; // ✅ import custom cors
import connectDb from "./config/db.js";
import adminRouter from "./routes/admin.js";
import projectRouter from "./routes/project.js";
import blogRouter from "./routes/blog.js";
import testimonialRouter from "./routes/testimonial.js";
import faqRouter from "./routes/faq.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors(corsOptions));

// ✅ Middleware setup
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());


// ✅ Connect database
connectDb();

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

app.use('/api/admin', adminRouter)
app.use('/api/project', projectRouter)
app.use('/api/blog', blogRouter)
app.use('/api/testimonial', testimonialRouter)
app.use('/api/faq', faqRouter)

app.use("/api/admin", adminRouter);
app.use("/api/project", projectRouter);
app.use("/api/blog", blogRouter);
app.use("/api/testimonial", testimonialRouter);
app.use("/api/faq", faqRouter);

// ✅ Error handler for better debugging
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
