const express = require("express");
const router = express.Router();
const api = require("./api/index");
const auth = require("./auth/index");
const { checkAuth } = require("../middlewares/auth/checkAuth");

router.use("/v1/api",api);
router.use("/v1/auth",auth);


module.exports = router;
