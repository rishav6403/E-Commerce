const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image:{
        type:String,
      },
      createdBy:mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
  );
  
  const cartProducts = mongoose.model("cart", cartSchema);
  
  module.exports = cartProducts;