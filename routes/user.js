const{handleUserSignUp,handleUserLogin,} = require("../controller/user")

const express = require('express');

const router = express.Router();

router.post("/",handleUserSignUp);
router.post("/login", handleUserLogin);
module.exports = router;