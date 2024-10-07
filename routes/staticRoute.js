const express = require("express");
const{checkForAuthentication,restrictTo} =require("../middleware/auth")
const router = express.Router();
const products = require("../model/product");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './productImages')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
    })
    
     const upload = multer({ storage: storage })

router.get("/",checkForAuthentication, async(req, res)=>{
    try {
        const allUsers = req.user.role;
        const allproducts = await products.find();
        return res.render("home", {
            products: allproducts,
            role:allUsers,
        });
    } catch (err) {
        return res.status(500).send("Server Error");
    }
    // return res.render("home")
});

router.get("/signup", (req, res)=>{
    return res.render("signup")
})
router.get("/login", (req, res)=>{
    return res.render("login")
})
router.get("/logout",(req, res)=>{
    res.cookie("token", "");
    return res.redirect("/login")
})
router.get("/products",checkForAuthentication,restrictTo(["ADMIN"]), (req, res)=>{
    return res.render('products')
})

module.exports = router;