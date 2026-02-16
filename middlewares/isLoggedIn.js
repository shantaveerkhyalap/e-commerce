const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req , res , next) => {
    console.log(req.cookies.token);
    if(!req.cookies.token) {
        req.flash("error" , "you need to login first");
        return res.redirect("/");
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        console.log(decoded);
        let user = await userModel
            .findOne({email: decoded.email})
            .select("-password");
        req.user = user;    
        next();
    } catch(err) {
        req.flash("error" , "Something went wrong..!");
        res.redirect("/");
    }
}

// const jwt = require("jsonwebtoken");

// const isLoggedIn = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     req.flash("error", "You need to log in first");
//     return res.redirect("/");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.user = decoded;  // Must include email and _id
//     next();
//   } catch (err) {
//     console.error("JWT Decode error:", err.message);
//     req.flash("error", "Invalid or expired token");
//     return res.redirect("/");
//   }
// };

// module.exports = isLoggedIn;