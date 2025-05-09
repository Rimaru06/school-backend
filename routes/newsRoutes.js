const router = require('express').Router();
const { createNews, getNews } = require('../controllers/newsController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('admin', 'faculty'), createNews);
router.get('/', getNews);
module.exports = router;