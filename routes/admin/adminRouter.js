const router = require("express").Router();
const { check } = require("express-validator");
const adminCtrl = require("../../controllers/admin/adminCtrl");
const adminAuth = require("../../middlewares/adminAuth");
const authAdmin = require("../../middlewares/auth_admin");

// post request
router.post(
  "/admin/signup",
  check("username", "Please provide a username").notEmpty(),
  check("email", "Please provide a valid email").isEmail(),
  check(
    "password",
    "Please provide a password with 6 or more characters"
  ).isLength({ min: 6 }),
  adminAuth,
  adminCtrl.register
);

router.post("/admin/signin", adminCtrl.login);
router.post(
  "/admin/auth-signin",
  check("auth_code", "Please provide the code sent to your email").notEmpty(),
  adminCtrl.authenticateLogin
);
router.post("/admin/forgotpassword", adminCtrl.forgotPassword);
router.post("/admin/resetpassword", adminCtrl.resetPassword);
router.post("/admin/changepassword", authAdmin, adminCtrl.changePassword);

// get requests
router.get("/admin/user", authAdmin, adminCtrl.getUser);
router.get("/admin/dashboard-count", authAdmin, adminCtrl.getDashboardCount);

// ==========================================================
// super admin routes
router.patch("/update-role", adminAuth, adminCtrl.updateAdminRole);
router.get("/admin/all-users", adminAuth, adminCtrl.getAllUser);
router.get("/admin/all-agents", adminAuth, adminCtrl.getAllUser);

module.exports = router;
