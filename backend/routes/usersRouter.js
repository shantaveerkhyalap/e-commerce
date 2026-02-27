const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { createCollection, addToCollection } = require("../controllers/collectionController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");

// POST /api/users/register
router.post("/register", registerUser);

// POST /api/users/login
router.post("/login", loginUser);

// POST /api/users/logout
router.post("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.json({ success: true, message: "Logged out successfully" });
});

// POST /api/users/newCollection
router.post("/newCollection", isLoggedIn, createCollection);

// POST /api/users/add-to-collection
router.post("/add-to-collection", isLoggedIn, addToCollection);

// GET /api/users/collections
router.get("/collections", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel
            .findOne({ _id: req.user._id })
            .populate({
                path: "collections",
                populate: { path: "products" },
            });

        // Convert product images in collections
        const collections = user.collections.map((c) => {
            const cObj = c.toObject();
            cObj.products = cObj.products.map((p) => {
                if (p.image) {
                    p.image = `data:image/jpeg;base64,${p.image.toString("base64")}`;
                }
                return p;
            });
            return cObj;
        });

        res.json({ success: true, collections });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Unable to load collections." });
    }
});

module.exports = router;
