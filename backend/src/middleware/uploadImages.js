const multer = require('multer');
const path = require('path');
const fs = require('fs');

const AppError = require('../utils/appError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    let folder = path.join(__dirname, '../../uploads/misc');

    if (req.baseUrl.includes('/posts')) {
      folder = path.join(__dirname, '../../uploads/posts');
    }
    if (req.baseUrl.includes('/places')) {
      folder = path.join(__dirname, '../../uploads/places');
    }

    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1E9);

    cb(
      null,
      `${uniqueSuffix}${path.extname(file.originalname)}`
    );
  }
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {

    return cb(
      new AppError('Formato de imagen inválido', 400),
      false
    );
  }

  cb(null, true);
};

module.exports = multer({
  storage,
  fileFilter,

  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024
  }
});