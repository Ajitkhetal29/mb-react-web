export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const projectName = req.body.name.replace(/\s+/g, '_');
    const baseFolder = path.join(__dirname, '..', 'uploads', projectName);
    if (!fs.existsSync(baseFolder)) {
      fs.mkdirSync(baseFolder, { recursive: true });
    }

    let subFolder = 'others';

    if (file.fieldname === 'logo') subFolder = 'logo';
    else if (file.fieldname === 'coverImage') subFolder = 'coverImage';
    else if (file.fieldname === 'caraouselImages') subFolder = 'caraouselImages';
    else if (file.fieldname === 'galleryImages') subFolder = 'galleryImages';
    else if (file.fieldname === 'browcherPdf') subFolder = 'browcherPdf';
    else if (file.fieldname === 'layouts') subFolder = 'layouts';

    const finalFolder = path.join(baseFolder, subFolder);
    if (!fs.existsSync(finalFolder)) {
      fs.mkdirSync(finalFolder, { recursive: true });
    }

    cb(null, finalFolder);

  },

  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '_' + filename);
  }

})

export const upload = multer({ storage });