const router = require('express').Router();
const { uploadPhoto, getPhotos } = require('../controllers/galleryController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, roleCheck('admin', 'faculty'), upload.single('image'), uploadPhoto);
router.get('/', getPhotos);
module.exports = router;