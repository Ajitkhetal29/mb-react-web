import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const baseFolder = path.join(__dirname, '..', 'uploads', 'blogs');

    if (!fs.existsSync(baseFolder)) {
      fs.mkdirSync(baseFolder, { recursive: true });
    }
    cb(null, baseFolder);

  },
  filename : (req, file, cb) => {
    const filename = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '_' + filename);
  }

})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const projectName = req.body.name
      ? req.body.name.replace(/\s+/g, '_')
      : 'unnamed_project';

    const baseFolder = path.join(__dirname, '..', 'uploads', projectName);

    let subFolder = 'others';
    if (file.fieldname === 'logo') subFolder = 'logo';
    else if (file.fieldname === 'coverImage') subFolder = 'coverImage';
    else if (['carouselImages', 'newCaraouselImages'].includes(file.fieldname)) subFolder = 'carouselImages';
    else if (['galleryImages', 'galleryNewImages'].includes(file.fieldname)) subFolder = 'galleryImages';
    else if (file.fieldname === 'browcherPdf') subFolder = 'browcherPdf';
    else if (['layoutImages', 'newlayoutImages'].includes(file.fieldname)) subFolder = 'layouts';
    else if (['otherVideos', 'otherNewVideos'].includes(file.fieldname)) subFolder = 'otherVideos';

    const finalFolder = path.join(baseFolder, subFolder);
    if (!fs.existsSync(finalFolder)) {
      fs.mkdirSync(finalFolder, { recursive: true });
    }

    cb(null, finalFolder);
  },

  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '_' + filename);
  },
});

export const upload = multer({ storage });
export const blogUpload = multer({ storage: blogStorage });
