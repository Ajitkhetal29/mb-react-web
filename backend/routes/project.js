import { createProject, deleteProject, getAllProjects, updateProject } from '../controllers/Project.js';
import { upload } from '../config/multer.js';

import express from 'express';

const projectRouter = express.Router();

projectRouter.post(
    "/addProject",
    upload.fields([
        { name: "galleryImages", maxCount: 20 },
        { name: "layoutImages", maxCount: 50 },
        { name: "browcherPdf", maxCount: 50 },
    ]),
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

    ]),
    updateProject

);
projectRouter.get('/allProjects', getAllProjects)
projectRouter.post('/deleteProject', deleteProject)

export default projectRouter;