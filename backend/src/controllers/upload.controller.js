const { upload } = require('../services/upload.service');
const { AppError } = require('../middleware/errorHandler');

const uploadImage = (req, res, next) => {
  const uploadSingle = upload.single('image');

  uploadSingle(req, res, (err) => {
    if (err) {
      return next(new AppError('Image upload failed: ' + err.message, 400));
    }

    if (!req.file) {
      return next(new AppError('Please upload a file', 400));
    }

    // Return S3 location or local file path
    const imageUrl = req.file.location || `/uploads/${req.file.filename}`;

    res.status(200).json({ success: true, data: { url: imageUrl } });
  });
};

module.exports = {
  uploadImage
};
