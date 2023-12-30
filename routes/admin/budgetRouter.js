const router = require('express').Router();
const budgetCtrl = require('../../controllers/admin/budgetCtrl');
const authAdmin = require('../../middlewares/auth_admin');

router.post('/admin/budget', authAdmin, budgetCtrl.createBudget);

router.get('/admin/all-budget', authAdmin, budgetCtrl.getAllBudget);
router.get('/admin/user-budget/:id', authAdmin, budgetCtrl.getUserBudget);

router.patch('/admin/budget', authAdmin, budgetCtrl.updateUserBudget);


module.exports = router;