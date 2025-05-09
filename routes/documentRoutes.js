const router = require('express').Router();
const { uploadDocument, getDocuments } = require('../controllers/documentController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, roleCheck('admin', 'faculty'), upload.single('file'), uploadDocument);
router.get('/', getDocuments);
module.exports = router;