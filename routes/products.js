const{addproducts} = require("../controller/products");
const express = require("express")
const router = express.Router();
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
    router.post("/", upload.single('productImage'),addproducts)
    
    module.exports = router;
