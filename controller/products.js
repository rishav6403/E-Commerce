const products = require("../model/product")

async function addproducts(req, res){
    const{name,desc,price,category} = req.body;
    await products.create({
        name,
        desc,
        price,
        image:req.file.filename,
        category,
    })
return res.redirect("/allProducts")
}

module.exports = {
    addproducts,
}