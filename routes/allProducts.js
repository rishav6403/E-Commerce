const express = require("express")
const router = express.Router();
const products = require("../model/product");
const multer = require("multer");
const{restrictTo} = require("../middleware/auth")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './productImages')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
    })
    
     const upload = multer({ storage: storage })


     router.get("/", async (req, res) => {
      try {
        const allUsers = req.user.role;
          const categories = req.query.category;
          let query = {};
          if (categories && categories !== "") {
              query.category = categories;
          }
          const allproducts = await products.find(query);
          return res.render("allProducts", {
              products: allproducts,
              role:allUsers,
              categories,
              
          });
      } catch (err) {
          return res.status(500).send("Server Error");
      }
  });


router.get('/delete/:id', async (req, res) => {
   await products.findOneAndDelete({ _id: req.params.id })
   return res.status(401).redirect('/allProducts');
})

router.get('/edit/:id',restrictTo(["ADMIN"]), async (req, res) => {
   const product = await products.findOne({ _id: req.params.id });
   return res.render("edit", { product });
})

router.post('/update/:id', upload.single('productImage') , async (req, res) => {
   const { name, desc, price,image, category } = req.body;
   await products.findOneAndUpdate({ _id: req.params.id }, { name, desc, price, image, category }, { new: true });
   return res.redirect("/allProducts");
})

module.exports = router;