// const express = require("express");
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let { generateToken } = require("../utils/generateToken");

// let registerUser = async (req, res) => {
//     try {
//         let { email, password, fullname, isadmin } = req.body;

//         // Hash password first
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(password, salt, async (err, hash) => {
//                 if (err) return res.send(err.message);

//                 console.log("isadmin:", isadmin);
//                 if (isadmin === "true" && process.env.NODE_ENV === "development") {
//                     // ✅ Create an owner
//                     const ownerExists = await ownerModel.findOne({ email });
//                     if (ownerExists)
//                         return res.status(400).send("Owner with this email already exists");

//                     let createdOwner = await ownerModel.create({
//                         fullname,
//                         email,
//                         password: hash,
//                         isadmin: true,
//                     });

//                     console.log("Owner created:", createdOwner);
//                     req.flash("success", "Admin account created. You can now log in.");
//                     return res.redirect("/");
//                 } else {
//                     // ✅ Create a user
//                     const userExists = await userModel.findOne({ email });
//                     if (userExists)
//                         return res.status(400).send("User with this email already exists");

//                     let createdUser = await userModel.create({
//                         fullname,
//                         email,
//                         password: hash,
//                     });
                    
//                     console.log("User created:", createdUser);
//                     req.flash("success", "Account created. Please log in.");
//                     return res.redirect("/");
//                 }
//             });
//         });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// };


// let loginUser = async (req, res) => {
//     try {
//         let { password, email } = req.body;

//         let user = await userModel.findOne({ email }) || await ownerModel.findOne({email});
//         if (!user) return res.status(401).send("Email or password is incorrect");

//         bcrypt.compare(password, user.password, (err, result) => {
//             if (result) {
//                 let token = generateToken(user);
//                 res.cookie("token", token);
//                 req.flash("success", "logged in succesfully..")
//                 res.redirect("/shop");
//                 console.log("User logged in:", user);
//             } else {
//                 res.send("Email or password is incorrect");
//             }
//         });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// };

let registerUser = async (req , res) => {
    // let user = await userModel.find({ email: req.body.email })
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({email});
        if(user) return res.status(401).send("You already have an account , please login");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let createduser = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });
                    console.log(createduser);
                    req.flash("success", "Account created! Please login.");
                    return res.redirect("/");
                }
            });
        });
    }
    
    catch (err) {
        res.send(err.message);
    }
};

let loginUser = async (req, res) => {
    try {
        let { password, email } = req.body;
        
        let user = await userModel.findOne({ email });
        if (!user) return res.status(401).send("Email or password is incorrect");
        
        bcrypt.compare(password, user.password, (err, result) => {
            if(result ) {
                let token = generateToken(user);
                 res.cookie("token", token);
                 req.flash("success" , "logged in succesfully..")
                 res.redirect("/shop");
            } else {
                res.send("Email or password is incorrect");
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    registerUser,
    loginUser,
};
