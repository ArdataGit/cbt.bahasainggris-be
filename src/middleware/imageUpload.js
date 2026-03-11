import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to create storage with dynamic destination
const createStorage = (subfolder = '') => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const dest = path.join(__dirname, '../public/uploads', subfolder);
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      cb(null, dest);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
};

// File filter (only allow image files)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024 // 5MB limit
};

// Default upload middleware
const upload = multer({ 
  storage: createStorage(),
  fileFilter: fileFilter,
  limits: limits
});

// Function to get middleware for specific subfolder
export const uploadImageTo = (subfolder) => {
  return multer({
    storage: createStorage(subfolder),
    fileFilter: fileFilter,
    limits: limits
  });
};

export default upload;
