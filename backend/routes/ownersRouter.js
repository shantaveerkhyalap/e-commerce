const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isOwner = require("../middlewares/isOwner");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(403).json({ success: false, message: "Owner already exists" });
            }

            let { email, fullname, password } = req.body;
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
                isadmin: true,
            });

            res.status(201).json({ success: true, message: "Owner created", owner: createdOwner });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    });
}

// GET /api/owners/products – get products created by this owner
router.get("/products", isLoggedIn, isOwner, async (req, res) => {
    try {
        const owner = await ownerModel.findOne({ email: req.user.email }).populate("products");
        if (!owner) return res.status(404).json({ success: false, message: "Owner not found" });

        // Convert images to base64
        const productsWithImages = owner.products.map((p) => {
            const obj = p.toObject();
            if (obj.image) {
                obj.image = `data:image/jpeg;base64,${obj.image.toString("base64")}`;
            }
            return obj;
        });

        res.json({ success: true, products: productsWithImages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/owners/admin – check if user is owner (protected)
router.get("/admin", isLoggedIn, isOwner, (req, res) => {
    res.json({ success: true, message: "Welcome admin" });
});

module.exports = router;
