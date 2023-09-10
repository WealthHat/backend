const router = require('express').Router();
const blogCtrl = require('../../controllers/admin/blogCtrl');
const authAdmin = require('../../middlewares/auth_admin');

router.post('/admin/blog', authAdmin, blogCtrl.createBlog);

// router.get('/admin/all-blog', authAdmin, blogCtrl.getAllblog);
// router.get('/admin/blog/:id', authAdmin, blogCtrl.getUserblog);

// router.patch('/admin/blog', authAdmin, blogCtrl.updateUserblog);


module.exports = router;