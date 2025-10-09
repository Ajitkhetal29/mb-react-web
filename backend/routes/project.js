import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/Project.js';
import { upload } from '../config/multer.js';


import express from 'express';

const projectRouter = express.Router();

projectRouter.post(
    "/addProject",
    (req, res, next) => {


        upload.fields([
            { name: "logo", maxCount: 1 },
            { name: "coverImage", maxCount: 1 },
            { name: "carouselImages", maxCount: 20 },
            { name: "galleryImages", maxCount: 20 },
            { name: "browcherPdf", maxCount: 1 },
            { name: "layoutImages", maxCount: 10 },
            { name: "otherVideos", maxCount: 10 },

        ])(req, res, (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(400).json({ message: 'File upload failed', error: err });
            }
            next();
        });
    }
    ,
    createProject
);

projectRouter.post(
    "/updateProject",
    upload.fields([
        { name: "galleryImages", maxCount: 20 },
        { name: "galleryNewImages", maxCount: 20 },
        { name: "layoutImages", maxCount: 50 },
        { name: "newlayoutImages", maxCount: 50 },
        { name: "browcherPdf", maxCount: 50 },
        { name: "logo", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
        { name: "otherVideos", maxCount: 10 },
        { name: "carouselImages", maxCount: 20 },
        { name: "newCaraouselImages", maxCount: 20 },
        { name: 'otherNewVideos', maxCount: 10 }

    ]),
    updateProject

);
projectRouter.get('/allProjects', getAllProjects)
projectRouter.post('/deleteProject', deleteProject)

export default projectRouter;