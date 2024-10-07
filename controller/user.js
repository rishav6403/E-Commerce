const User = require("../model/user")
const{setUser}= require("../service/auth")

async function handleUserSignUp(req, res){
    const{name, email, password, role} = req.body;
    await User.create({
        name,
        email,
        role,
        password,
    })
    return res.redirect("/login");
}


async function handleUserLogin(req, res){
    const{email, password} = req.body;
    const user = await User.findOne({email, password})
    if(!user) 
        return res.render("login",{
        error: "Invalid username or password"
    });

    const token = setUser(user);
    res.cookie("token", token, {expires: new Date(Date.now() + 86400000), httpOnly:true});
   return res.redirect("/");
    
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
}