import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        message: { type: String, required: true },
        company: { type: String, required: false },
        position: { type: String, required: false },
    },
    { timestamps: true }
);
const testimonialModel = mongoose.model("Testimonial", testimonialSchema);
export default testimonialModel;