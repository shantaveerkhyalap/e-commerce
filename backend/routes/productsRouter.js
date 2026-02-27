const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const ownerModel = require("../models/owner-model");
const upload = require("../config/multer-config");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isOwner = require("../middlewares/isOwner");

// POST /api/products/create
router.post("/create", isLoggedIn, isOwner, upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor, category } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            category,
            owner: req.user._id,
        });

        let owner = await ownerModel.findOne({ email: req.user.email });
        if (owner) {
            owner.products.push(product._id);
            await owner.save();
        }

        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
