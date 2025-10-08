import projectModel from "../models/project.js";

const createProject = async (req, res) => {
  console.log("Incoming body:", req.body);
  console.log("Incoming files:", Object.keys(req.files || {}));
  try {
    const {
      name,
      builder,
      location,
      description,
      features,
      status,
      videoLink,
    } = req.body;

    const galleryPaths = (req.files.galleryImages || []).map((file) => ({
      title: file.originalname.replace(/\s+/g, "_"),
      image: file.path,
    }));

    const pdfFile = req.files?.browcherPdf?.[0] || "";
    const pdfPathWithExt = pdfFile ? pdfFile.path : "";

    const logo = req.files?.logo?.[0]?.path || "";
    const coverImage = req.files?.coverImage?.[0]?.path || "";
    const carouselImages = (req.files.carouselImages || []).map((file) => ({
      title: file.originalname.replace(/\s+/g, "_"),
      image: file.path,
    }));

    const otherVideos = (req.files?.otherVideos || []).map((file) => ({
      title: file.originalname.replace(/\s+/g, "_"),
      videoLink: file.path,
    }));

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
      logo,
      coverImage,
      carouselImages,
      otherVideos,
    });

    await project.save();

    res
      .status(201)
      .json({ success: true, message: "New Project Added", project });
  } catch (err) {
    console.error(err.message);
    console.log("create project failed");

    res
      .status(500)
      .json({ success: false, message: "Failed to create project" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await projectModel.find().sort({ createdAt: -1 });

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
      pdfChanged,
      galleryImages: galleryImagesStr = "[]",
      layouts: layoutsStr = "[]",
      newLayouts: newLayoutsStr = "[]",
    } = req.body;

    const existingProject = await projectModel.findById(id);
    console.log(existingProject);

    const existingGalleryImages = JSON.parse(galleryImagesStr);
    const existingLayouts = JSON.parse(layoutsStr);
    const newLayoutsMeta = JSON.parse(newLayoutsStr);

    const galleryNewImages = req.files?.galleryNewImages || [];
    const newlayoutImages = req.files?.newlayoutImages || [];

    let pdfFile;
    let pdfPathWithExt = "";

    if (pdfChanged === "true") {
      pdfFile = req.files?.browcherPdf?.[0];
      pdfPathWithExt = pdfFile ? pdfFile.path + ".pdf" : "";
    } else {
      pdfPathWithExt = existingProject.browcherPdf;
    }

    const newGalleryPaths = galleryNewImages.map((file) => ({
      filename: file.originalname.replace(/\s+/g, "_"),
      path: file.path,
    }));

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

    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Project updated", updatedProject });
  } catch (error) {
    console.error("Update project error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;

    await projectModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete project" });
  }
};

export { createProject, updateProject, getAllProjects, deleteProject };
