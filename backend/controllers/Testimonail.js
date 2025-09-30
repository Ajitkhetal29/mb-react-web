import testimonialModel from "../models/testimonals.js";


const createTestimonial = async (req, res) => {
    try {
        const { name, message, company, position } = req.body;
        console.log("req.body", req.body);  
        const testimonial = new testimonialModel({
            name,
            message,
            company,
            position
        }); 
        await testimonial.save();
        res.status(201).json({ success: true, message: "New Testimonial Added", testimonial });
    }   catch (err) {   
        console.error(err.message); 
        console.log("create testimonial failed");
        res.status(500).json({ success: false, message: "Failed to create testimonial" });
    }   
};

const getAllTestimonials = async (req, res) => {
    try {
        const allTestimonials = await testimonialModel.find().sort({ createdAt: -1 });
        res.status(201).json({ success: true, message: "All Testimonials Fetched", allTestimonials });
    }   catch (error) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch all testimonials" });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        await testimonialModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Testimonial Deleted" });
    }
    catch (error) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to delete testimonial" });
    }
};

export { createTestimonial, getAllTestimonials, deleteTestimonial };

