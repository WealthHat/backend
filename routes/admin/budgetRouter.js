const router = require('express').Router();
const budgetCtrl = require('../../controllers/admin/budgetCtrl');
const authAdmin = require('../../middlewares/auth_admin');

router.post('/admin/budget', authAdmin, budgetCtrl.createBudget);

router.get('/admin/all-budget', authAdmin, budgetCtrl.getAllBudget);
// router.get('/admin/user-networth/:id', authAdmin, budgetCtrl.getUserNetworth);

// router.patch('/admin/net-worth', authAdmin, budgetCtrl.updateUserNetworth);


module.exports = router;