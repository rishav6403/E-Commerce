const express = require("express")
const router = express.Router();

const { cartproducts, getCartItems ,deleteCartItem} = require("../controller/cart")

router.get("/:id", cartproducts)
router.get("/", getCartItems);
router.get("/delete/:id", deleteCartItem);

module.exports = router; 