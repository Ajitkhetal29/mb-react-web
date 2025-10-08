import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    console.log("multer called");

    const projectName = req.body.name
      ? req.body.name.replace(/\s+/g, '_')
      : 'unnamed_project';

    const baseFolder = path.join(__dirname, '..', 'uploads', projectName);

    let subFolder = 'others';
    if (file.fieldname === 'logo') subFolder = 'logo';
    else if (file.fieldname === 'coverImage') subFolder = 'coverImage';
    else if (file.fieldname === 'carouselImages') subFolder = 'carouselImages';
    else if (file.fieldname === 'galleryImages') subFolder = 'galleryImages';
    else if (file.fieldname === 'browcherPdf') subFolder = 'browcherPdf';
    else if (file.fieldname === 'layoutImages') subFolder = 'layouts';
    else if (file.fieldname === 'otherVideos') subFolder = 'otherVideos';

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
