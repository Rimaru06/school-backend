const router = require('express').Router();
const { uploadPhoto, getPhotos , deletePhoto } = require('../controllers/galleryController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Cloudinary config
const { storage } = require('../utils/cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router.post(
  '/upload',
  auth,
  roleCheck('admin', 'faculty'),
  upload.single('image'), // 'image' is the key for file input
  uploadPhoto
);

router.get('/', getPhotos);

router.delete(
  '/:id',
  auth,
  roleCheck('admin', 'faculty'),
  deletePhoto
);

module.exports = router;
