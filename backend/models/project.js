import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        logo: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        caraouselImages: [
            {
                title: { type: String, required: true },
                image: { type: String, required: true },
            }],
        otherVideos: [{
            title: { type: String, required: true },
            videoLink: { type: String, required: true },
        }],

        builder: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        features: [String],
        galleryImages: [
            {
                title: { type: String, required: true },
                image: { type: String, required: true },
            },
        ],

        browcherPdf: { type: String, required: false },

        videoLink: { type: String, required: true },

        layouts: [
            {
                title: { type: String, required: true },
                area: { type: Number },
                price: { type: Number },
                image: { type: String, required: true },
            },
        ],

        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed"],
            default: "upcoming",
        },
    },
    { timestamps: true }
);


const projectModel = mongoose.model("Project", projectSchema);
export default projectModel;