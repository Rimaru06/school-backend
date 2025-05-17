const router = require('express').Router();
const { uploadDocument, getDocuments , deleteDocument } = require('../controllers/documentController');
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
  uploadDocument
);

router.get('/', getDocuments);

router.delete(
  '/:id',
  auth,
  roleCheck('admin', 'faculty'),
  deleteDocument
);


module.exports = router;
