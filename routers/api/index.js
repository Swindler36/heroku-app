const express = require("express");
const router = express.Router();
const { setQuestion,sendQuestion } = require("../../controller/question/question");

router.use("/",express.static("static"));
router.get("/create/question",setQuestion);
router.get("/send/question",sendQuestion);

module.exports = router; 