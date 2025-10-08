import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import adminRouter from "./routes/admin.js";
import projectRouter from "./routes/project.js";
import path from 'path'
import blogRouter from "./routes/blog.js";
import testimonialRouter from "./routes/testimonial.js";
import faqRouter from "./routes/faq.js";
import projectModel from "./models/project.js";



const app = express();
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), "uploads")))

connectDb();

app.use('/api/admin', adminRouter)
app.use('/api/project', projectRouter)
app.use('/api/blog', blogRouter)
app.use('/api/testimonial', testimonialRouter)
app.use('/api/faq', faqRouter)



app.listen(3000, () => {
    console.log('Server is running ');

})

// const addprojects = async () => {

//     console.log("started");
    

//     await projectModel.insertMany([
//         {
//             "name": "Skyline Heights",
//             "builder": "UrbanNest Builders",
//             "location": "Bhayandar East",
//             "description": "Premium 2 & 3 BHK apartments with skyline views and modern amenities.",
//             "features": ["Gym", "Swimming Pool", "Kids Play Area"],
//             "galleryImages": [
//                 {
//                     "filename": "skyline1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
//                 },
//                 {
//                     "filename": "skyline2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/lady.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//             "videoLink": "https://youtu.be/tgbNymZ7vqY",
//             "layouts": [
//                 {
//                     "title": "2 BHK",
//                     "area": 980,
//                     "price": 6500000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
//                 }
//             ],
//             "status": "ongoing",

//         },
//         {
//             "name": "Green Valley",
//             "builder": "EcoLife Constructions",
//             "location": "Bhayandar West",
//             "description": "Nature-inspired homes with open green spaces and eco-friendly design.",
//             "features": ["Solar Panels", "Jogging Track", "Rainwater Harvesting"],
//             "galleryImages": [
//                 {
//                     "filename": "green1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/balloons.jpg",
//                 },
//                 {
//                     "filename": "green2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/dog.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.africau.edu/images/default/sample.pdf",
//             "videoLink": "https://youtu.be/ScMzIvxBSi4",
//             "layouts": [
//                 {
//                     "title": "3 BHK",
//                     "area": 1250,
//                     "price": 8900000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/balloons.jpg",
//                 }
//             ],
//             "status": "completed",

//         },
//         {
//             "name": "Ocean Breeze",
//             "builder": "BlueWave Realty",
//             "location": "Mira Road",
//             "description": "Sea-facing luxury residences with modern interiors and beach access.",
//             "features": ["Infinity Pool", "Clubhouse", "Sea View Balcony"],
//             "galleryImages": [
//                 {
//                     "filename": "ocean1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/couple.jpg",
//                 },
//                 {
//                     "filename": "ocean2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/mountain.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.orimi.com/pdf-test.pdf",
//             "videoLink": "https://youtu.be/e-ORhEE9VVg",
//             "layouts": [
//                 {
//                     "title": "4 BHK",
//                     "area": 1800,
//                     "price": 15000000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/mountain.jpg",
//                 }
//             ],
//             "status": "upcoming",

//         },
//         {
//             "name": "Urban Nest",
//             "builder": "MetroBuild Pvt Ltd",
//             "location": "Andheri West",
//             "description": "Affordable urban homes with seamless connectivity to the city.",
//             "features": ["Parking", "Community Hall", "Security"],
//             "galleryImages": [
//                 {
//                     "filename": "urban1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/car.jpg",
//                 },
//                 {
//                     "filename": "urban2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/fashion.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf",
//             "videoLink": "https://youtu.be/kJQP7kiw5Fk",
//             "layouts": [
//                 {
//                     "title": "1 BHK",
//                     "area": 600,
//                     "price": 4500000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/fashion.jpg",
//                 }
//             ],
//             "status": "ongoing",

//         },
//         {
//             "name": "Skyline Heights",
//             "builder": "UrbanNest Builders",
//             "location": "Bhayandar East",
//             "description": "Premium 2 & 3 BHK apartments with skyline views and modern amenities.",
//             "features": ["Gym", "Swimming Pool", "Kids Play Area"],
//             "galleryImages": [
//                 {
//                     "filename": "skyline1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
//                 },
//                 {
//                     "filename": "skyline2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/lady.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//             "videoLink": "https://youtu.be/tgbNymZ7vqY",
//             "layouts": [
//                 {
//                     "title": "2 BHK",
//                     "area": 980,
//                     "price": 6500000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
//                 }
//             ],
//             "status": "ongoing",

//         },
//         {
//             "name": "Green Valley",
//             "builder": "EcoLife Constructions",
//             "location": "Bhayandar West",
//             "description": "Nature-inspired homes with open green spaces and eco-friendly design.",
//             "features": ["Solar Panels", "Jogging Track", "Rainwater Harvesting"],
//             "galleryImages": [
//                 {
//                     "filename": "green1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/balloons.jpg",
//                 },
//                 {
//                     "filename": "green2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/dog.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.africau.edu/images/default/sample.pdf",
//             "videoLink": "https://youtu.be/ScMzIvxBSi4",
//             "layouts": [
//                 {
//                     "title": "3 BHK",
//                     "area": 1250,
//                     "price": 8900000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/balloons.jpg",
//                 }
//             ],
//             "status": "completed",

//         },
//         {
//             "name": "Ocean Breeze",
//             "builder": "BlueWave Realty",
//             "location": "Mira Road",
//             "description": "Sea-facing luxury residences with modern interiors and beach access.",
//             "features": ["Infinity Pool", "Clubhouse", "Sea View Balcony"],
//             "galleryImages": [
//                 {
//                     "filename": "ocean1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/couple.jpg",
//                 },
//                 {
//                     "filename": "ocean2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/mountain.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.orimi.com/pdf-test.pdf",
//             "videoLink": "https://youtu.be/e-ORhEE9VVg",
//             "layouts": [
//                 {
//                     "title": "4 BHK",
//                     "area": 1800,
//                     "price": 15000000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/mountain.jpg",
//                 }
//             ],
//             "status": "upcoming",

//         },
//         {
//             "name": "Urban Nest",
//             "builder": "MetroBuild Pvt Ltd",
//             "location": "Andheri West",
//             "description": "Affordable urban homes with seamless connectivity to the city.",
//             "features": ["Parking", "Community Hall", "Security"],
//             "galleryImages": [
//                 {
//                     "filename": "urban1.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/car.jpg",
//                 },
//                 {
//                     "filename": "urban2.png",
//                     "path": "https://res.cloudinary.com/demo/image/upload/fashion.jpg",
//                 }
//             ],
//             "browcherPdf": "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf",
//             "videoLink": "https://youtu.be/kJQP7kiw5Fk",
//             "layouts": [
//                 {
//                     "title": "1 BHK",
//                     "area": 600,
//                     "price": 4500000,
//                     "image": "https://res.cloudinary.com/demo/image/upload/fashion.jpg",
//                 }
//             ],
//             "status": "ongoing",

//         },
//     ]

//     )


//     console.log('done');
    
// }


// export default addprojects();





