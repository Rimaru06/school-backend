const router = require('express').Router();
const { uploadMandatoryDocument, getMandatoryDocuments } = require('../controllers/Mandatory');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Cloudinary & Multer config
const multer = require('multer');
const { storage } = require("../utils/cloudinary"); // Cloudinary disk storage engine
const upload = multer({ storage });

// Routes
router.post(
  '/upload',
  auth,
  roleCheck('admin', 'faculty'),
  upload.single('file'), // 'file' should match frontend FormData key
  uploadMandatoryDocument
);

router.get('/', getMandatoryDocuments);

module.exports = router;
