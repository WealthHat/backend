const router = require('express').Router();
const profilingCtrl = require('../../controllers/user/profilingCtrl');
const auth = require('../../middlewares/auth');

// post request
router.post('/profiling', auth, profilingCtrl.createProfiling);

// get request
// router.get('/user', auth, userCtrl.getUser);
 
module.exports = router;
