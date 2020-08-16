const express = require("express");
const router = express.Router();
const { signIn,deleteAccount,login } = require("../../controller/auth/auth");

router.post("/sign-in",signIn);
router.post("/delete",deleteAccount);
router.get("/login",login);

module.exports = router; 