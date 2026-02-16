const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController")
const { createCollection, renderCreateForm, addToCollection } = require("../controllers/collectionController")

const isLoggedIn = require("../middlewares/isLoggedIn");
let userModel = require("../models/user-model");
const collectionModel = require("../models/collection-model");

router.get("/", (req, res) => {
  res.send("Hey user..!");
});

router.get("/newCollection", isLoggedIn, renderCreateForm);

router.post("/newCollection", isLoggedIn, createCollection);

router.post("/register", registerUser);

router.post("/login", loginUser);



router.get("/logout", (req, res) => {
  res.cookie("token", "");
  req.flash("success", "Logged out successfully");
  res.redirect("/");
});


router.get("/collections", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id }).populate("collections");
    res.render("userCollections", {
      collections: user.collections,
      success: req.flash("success"),
      error: req.flash("error"),
    });

  } catch (err) {
    console.error(err);
    req.flash("error", "Unable to load collections.");
    res.redirect("/users/newCollection");
  }
});


router.post("/add-to-collection", isLoggedIn, addToCollection);




module.exports = router;