const products = require("../model/product")
const cart = require("../model/cart")

async function cartproducts(req, res) {
    const { name, price, category, image} = await products.findOne({ _id: req.params.id });
    await cart.create({
        name,
        price,
        category,
        image,
        createdBy:req.user.id,
    })
    return res.redirect("/cart")
}

async function getCartItems(req, res) {
    try {

        const cartproducts = await cart.find({createdBy:req.user.id});
        return res.render("cart", { cart: cartproducts,  });
    } catch (err) {
        return res.status(500).send("Server Error");
    }
}

async function deleteCartItem (req, res) {
    await cart.findOneAndDelete({ _id: req.params.id })
   return res.status(401).redirect('/cart');
}

module.exports = {
    cartproducts,
    getCartItems,
    deleteCartItem
}