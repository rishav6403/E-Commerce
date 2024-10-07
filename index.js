const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")


const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/user");
const productsRoute = require("./routes/products")
const allProductsRoute = require("./routes/allProducts")
const cartProductsRoute = require("./routes/cart")
const{restrictTo,checkForAuthentication} = require("./middleware/auth")
const {connectToMongoDB} = require("./connections")

const PORT = process.env.PORT || 8000;
const mongoDbUri = process.env.Mongo_DB_URI || "mongodb://127.0.0.1"

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static("./productImages"));
app.use(express.static("./cartImages"));
app.use(express.static("views"))


app.use("/",staticRoute,);
app.use("/user", userRoute);
app.use("/products",checkForAuthentication,restrictTo(["ADMIN"]),productsRoute);
app.use("/allProducts",checkForAuthentication, allProductsRoute)
app.use("/cart",checkForAuthentication, cartProductsRoute)



connectToMongoDB(mongoDbUri).then(()=>{
    console.log("Mongo db connected");
});

app.listen(PORT,()=>{console.log(`Server starting at ${PORT}`)})