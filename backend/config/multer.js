import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dqvg0fkmw",
  api_key: "649715569554247",
  api_secret: "C4ySo8q6_H450fyNdvJXG69q3gI",
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "projects/default";
    let resource_type = "image"; // default

    if (file.fieldname === "galleryImages" || file.fieldname === "galleryNewImages") {
      folder = "projects/gallery";
    } else if (file.fieldname === "layoutImages" || file.fieldname === "newlayoutImages") {
      folder = "projects/layouts";
    } else if (file.fieldname === "browcherPdf" || file.fieldname === "newBrowcherPdf") {
      folder = "projects/browcher";
      resource_type = "raw";
    }

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
      resource_type,
      public_id: file.originalname.replace(/\.[^/.]+$/, ""),
    };
  },
});

export const upload = multer({ storage });