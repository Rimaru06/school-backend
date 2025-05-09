const router = require('express').Router();
const { registerFaculty, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/register-faculty', auth, roleCheck('admin'), registerFaculty);
router.post('/login', login);
module.exports = router;