const router = require("express").Router();

router.use("/product", require("./product"));

module.exports = router;
