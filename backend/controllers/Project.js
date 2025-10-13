import projectModel from "../models/project.js";

const createProject = async (req, res) => {

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
      title: file.originalname.replace(/\s+/g, "_").split('.')[0],
      image: 'upload' + file.path.split('upload')[1].replace(/\\/g, '/'),
    }));

    const pdfFile = req.files?.browcherPdf?.[0] || "";
    const pdfPath = 'upload' + (pdfFile ? pdfFile.path.split('upload')[1].replace(/\\/g, '/') : "");

    const logo = req.files?.logo?.[0]?.path || "";
    const logoPath = 'upload' + (logo ? logo.split('upload')[1].replace(/\\/g, '/') : "");

    const coverImage = req.files?.coverImage?.[0]?.path || "";
    const coverImagePath = 'upload' + (coverImage ? coverImage.split('upload')[1].replace(/\\/g, '/') : "");

    const carouselImages = (req.files.carouselImages || []).map((file) => ({
      title: file.originalname.replace(/\s+/g, "_").split('.')[0],
      image: 'upload' + file.path.split('upload')[1].replace(/\\/g, '/'),
    }));

    const otherVideos = (req.files?.otherVideos || []).map((file) => ({
      title: file.originalname.replace(/\s+/g, "_").split('.')[0],
      videoLink: 'upload' + file.path.split('upload')[1].replace(/\\/g, '/'),
    }));

    const layoutMeta = JSON.parse(req.body.layouts || "[]");

    const layoutImages = req.files?.layoutImages || [];

    const layouts = layoutMeta.map((meta, i) => ({
      ...meta,
      image: 'upload' + layoutImages[i]?.path.split('upload')[1].replace(/\\/g, '/') || "",
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
      browcherPdf: pdfPath,
      logo: logoPath,
      coverImage: coverImagePath,
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

      // new
      logoChanged,
      coverImageChanged,
      carouselImages: caraouselImagesStr = "[]",
      otherVideos: otherVideosStr = "[]",

      galleryImages: galleryImagesStr = "[]",
      layouts: layoutsStr = "[]",
      newLayouts: newLayoutsStr = "[]",

    } = req.body;

    const existingProject = await projectModel.findById(id);


    const existingGalleryImages = JSON.parse(galleryImagesStr);
    const existingLayouts = JSON.parse(layoutsStr);
    const newLayoutsMeta = JSON.parse(newLayoutsStr);


    

    // new 
    const existingCaraouselImages = JSON.parse(caraouselImagesStr);
    const existingOtherVideos = JSON.parse(otherVideosStr);

    const galleryNewImages = req.files?.galleryNewImages || [];
    const newlayoutImages = req.files?.newlayoutImages || [];

    // new 
    const newCaraouselImages = req.files?.newCaraouselImages || [];
    const newOtherVideos = req.files?.otherNewVideos || [];


    let pdfFile;
    let pdfPathWithExt = "";

    if (pdfChanged === "true") {
      pdfFile = req.files?.browcherPdf?.[0];
      pdfPathWithExt = 'upload' + (pdfFile ? pdfFile.path.split('upload')[1].replace(/\\/g, '/') : "");
    } else {
      pdfPathWithExt = existingProject.browcherPdf;
    }

    let logo = "";
    let coverImage = "";

    // new 
    if (logoChanged === "true") {
      logo = 'upload' + (req.files?.logo?.[0]?.path.split('upload')[1].replace(/\\/g, '/') || "");
    }
    else {
      logo = existingProject.logo;
    }

    // covrer image
    if (coverImageChanged === "true") {
      coverImage = 'upload' + (req.files?.coverImage?.[0]?.path.split('upload')[1].replace(/\\/g, '/') || "");
    }
    else {
      coverImage = existingProject.coverImage;
    }

    const newGalleryPaths = galleryNewImages.map((file) => ({
      title: file.originalname.replace(/\s+/g, "_").split('.')[0],
      image: 'upload' + (file.path.split('upload')[1].replace(/\\/g, '/') || ""),
    }));

    // new
    const newCaraouselPaths = newCaraouselImages.map((file) => ({
      title: file.originalname.replace(/\s+/g, "_").split('.')[0],
      image: 'upload' + (file.path.split('upload')[1].replace(/\\/g, '/') || ""),
    }));

    const newOtherVideosPaths = newOtherVideos.map((file) => ({
      title: file.originalname.replace(/\s+/g, "_").split('.')[0],
      videoLink: 'upload' + (file.path.split('upload')[1].replace(/\\/g, '/') || ""),
    }));

    const newLayouts = newLayoutsMeta.map((meta, i) => ({
      ...meta,
      image: 'upload' + ( newlayoutImages[i]?.path.split('upload')[1].replace(/\\/g, '/') || ""),
    }));

    const updatedGalleryImages = [...existingGalleryImages, ...newGalleryPaths];

    const updatedLayouts = [...existingLayouts, ...newLayouts];

    const updatedCaraouselImages = [...existingCaraouselImages, ...newCaraouselPaths];

    const updatedOtherVideos = [...existingOtherVideos, ...newOtherVideosPaths];

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
      logo,
      coverImage,
      carouselImages: updatedCaraouselImages,
      otherVideos: updatedOtherVideos,
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
