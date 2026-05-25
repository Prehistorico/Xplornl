const multer = require('multer');
const path = require('path');

const AppError = require('../utils/appError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, 'uploads/posts');},
  filename: (req, file, cb) => {

    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1E9);

    cb(
      null,
      `post-${uniqueSuffix}${path.extname(file.originalname)}`
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

const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 4,
    fileSize: 5 * 1024 * 1024
  }

});

module.exports = upload.array('images', 4);