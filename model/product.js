const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image:{
        type:String,
        required:true,
      },
      category:{
        type:String,
        required:true,
      }
    },
    { timestamps: true }
  );
  
  const products = mongoose.model("products", productSchema);
  
  module.exports = products;