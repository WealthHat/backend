const router = require('express').Router();
const performanceCtrl = require('../../controllers/admin/performanceCtrl');
const authAdmin = require('../../middlewares/auth_admin');

router.post('/admin/performance', authAdmin, performanceCtrl.createPerformance);

// router.get('/admin/all-performance', authAdmin, performanceCtrl.getAllPerformance);
// router.get('/admin/user-performance/:id', authAdmin, performanceCtrl.getUserPerformance);

// router.patch('/admin/performance', authAdmin, performanceCtrl.updateUserPerformance);


module.exports = router;