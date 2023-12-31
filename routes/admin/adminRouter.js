const router = require('express').Router();
const { check } = require('express-validator');
const adminCtrl = require('../../controllers/admin/adminCtrl');
const adminAuth = require('../../middlewares/adminAuth');
const authAdmin = require('../../middlewares/auth_admin');

// post request
router.post(
  '/admin/signup',
  check('username', 'Please provide a username').notEmpty(),
  check('email', 'Please provide a valid email').isEmail(),
  check(
    'password',
    'Please provide a password with 6 or more characters'
  ).isLength({ min: 6 }),
  adminAuth,
  adminCtrl.register
);

router.post('/admin/signin', adminCtrl.login); 
router.post(
  '/admin/auth-signin',
  check('auth_code', 'Please provide the code sent to your email').notEmpty(),
  adminCtrl.authenticateLogin
); 
// router.post("/auth/forgotpassword", userCtrl.forgotPassword);
// router.post("/auth/resetpassword", userCtrl.resetPassword);
router.post('/admin/changepassword', authAdmin, adminCtrl.changePassword);

router.get('/admin/user', authAdmin, adminCtrl.getUser);


// ==========================================================
// super admin routes
router.patch('/update-role', adminAuth, adminCtrl.updateAdminRole);

router.get('/admin/all-users', adminAuth, adminCtrl.getAllUser); 
router.get('/admin/all-agents', adminAuth, adminCtrl.getAllUser); 

module.exports = router;
