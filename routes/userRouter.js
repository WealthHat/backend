const router = require("express").Router();
const { check } = require("express-validator");
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/auth");

// post request
router.post(
  "/auth/signup",
  check("email", "Please provide a valid email").isEmail(),
  check(
    "password",
    "Please provide a password with 6 or more characters"
  ).isLength({ min: 6 }),
  userCtrl.register
);

router.post("/auth/activate", 
check("code", "Please provide the activation code"),
userCtrl.authenticate);
router.post("/auth/resend-code", userCtrl.resend);
router.post("/auth/signin", userCtrl.login);
router.post("/auth/forgotpassword", userCtrl.forgotPassword);
router.post("/auth/resetpassword", userCtrl.resetPassword);
router.post("/auth/changepassword", auth, userCtrl.changePassword);

// patch request
router.patch("/user", auth, userCtrl.updateUser);


// get request
router.get("/user", auth, userCtrl.getUser);

module.exports = router;
