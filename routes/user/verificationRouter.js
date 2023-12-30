const router = require('express').Router();
const verificationCtrl = require('../../controllers/user/verificationCtrl');
const auth = require('../../middlewares/auth');

// post request
router.post('/onboarding/verification', auth, verificationCtrl.verification);

// get request
// router.get('/user', auth, userCtrl.getUser);
 
module.exports = router;
