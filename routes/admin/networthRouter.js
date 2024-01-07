const router = require("express").Router();
const networthCtrl = require("../../controllers/admin/networthCtrl");
const authAdmin = require("../../middlewares/auth_admin");

router.post("/admin/net-worth", authAdmin, networthCtrl.createNetworth);

router.get("/admin/all-networth", authAdmin, networthCtrl.getAllNetworth);
router.get("/admin/user-networth/:id", authAdmin, networthCtrl.getUserNetworth);
router.get("/admin/networth-chart", authAdmin, networthCtrl.networthChart);

router.patch("/admin/net-worth", authAdmin, networthCtrl.updateUserNetworth);

module.exports = router;
