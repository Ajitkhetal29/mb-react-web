import projectModel from "../models/project.js";

const createProject = async (req, res) => {
  try {

    const { name, builder, location, description, features, status, videoLink } = req.body;

    const galleryPaths = (req.files.galleryImages || []).map((file) => ({
      filename: file.originalname.replace(/\s+/g, "_"),
      path: file.path,
    }));


    const pdfPath = req.files?.browcherPdf?.[0]?.path || "";
    const pdfPathWithExt = pdfFile ? pdfFile.path + ".pdf" : "";

    const layoutMeta = JSON.parse(req.body.layouts || "[]");

    const layoutImages = req.files?.layoutImages || [];

    const layouts = layoutMeta.map((meta, i) => ({
      ...meta,
      image: layoutImages[i]?.path || "",
    }));

    const project = new projectModel({
      name,
      builder,
      location,
      description,
      features: features ? JSON.parse(features) : [],
      status,
      videoLink,
      galleryImages: galleryPaths,
      layouts,
      browcherPdf: pdfPathWithExt,
    });

    await project.save();

    res.status(201).json({ success: true, message: "Project Created", project });
  } catch (err) {
    console.error(err.message);
    console.log('create project failed');

    res.status(500).json({ success: false, message: "Failed to create project" });
  }
};


const getAllProjects = async (req, res) => {
  try {
    const allProjects = await projectModel.find();

    res
      .status(201)
      .json({ success: true, message: "All Project Fetched", allProjects });
  } catch (error) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all projects" });
  }
};

const updateProject = async (req, res) => {
  try {
    const {
      id,
      name,
      builder,
      location,
      description,
      videoLink,
      features,
      status,
      pdfFile,
      galleryImages: galleryImagesStr = "[]",
      layouts: layoutsStr = "[]",
      newLayouts: newLayoutsStr = "[]",
    } = req.body;

    const existingGalleryImages = JSON.parse(galleryImagesStr);
    const existingLayouts = JSON.parse(layoutsStr);
    const newLayoutsMeta = JSON.parse(newLayoutsStr);

    const galleryNewImages = req.files?.galleryNewImages || [];
    const newlayoutImages = req.files?.newlayoutImages || [];

    const newGalleryPaths = galleryNewImages.map((file) => ({
      filename: file.originalname.replace(/\s+/g, "_"),
      path: file.path,
    }));

    const pdfPath = req.files?.browcherPdf?.[0]?.path || "";
    const pdfPathWithExt = pdfFile ? pdfFile.path + ".pdf" : "";


    const newLayouts = newLayoutsMeta.map((meta, i) => ({
      ...meta,
      image: newlayoutImages[i]?.path || "",
    }));

    const updatedGalleryImages = [...existingGalleryImages, ...newGalleryPaths];

    const updatedLayouts = [...existingLayouts, ...newLayouts];


    let parsedFeatures = [];
    try {
      parsedFeatures = features ? JSON.parse(features) : [];
    } catch {
      parsedFeatures = [];
    }

    const updatedFields = {
      name,
      builder,
      location,
      description,
      status,
      videoLink,
      features: parsedFeatures,
      galleryImages: updatedGalleryImages,
      layouts: updatedLayouts,
      browcherPdf: pdfPathWithExt,
    };

    const updatedProject = await projectModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({ success: true, message: "Project updated", updatedProject });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ success: false, message: "Failed to update project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;

    await projectModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Project deleted" });

  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ success: false, message: "Failed to delete project" });
  }
}

export { createProject, updateProject, getAllProjects, deleteProject };