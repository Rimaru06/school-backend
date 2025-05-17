const router = require('express').Router();
const { createNews, getNews , deleteNews} = require('../controllers/newsController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck('admin', 'faculty'), createNews);
router.get('/', getNews);

router.delete('/:id', auth, roleCheck('admin', 'faculty'), deleteNews);

module.exports = router;