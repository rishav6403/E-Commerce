const{handleUserSignUp,handleUserLogin,handleGuestLogin} = require("../controller/user")

const express = require('express');

const router = express.Router();

router.post("/",handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/guest-login",handleGuestLogin );

module.exports = router;