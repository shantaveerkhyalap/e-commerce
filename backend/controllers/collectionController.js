const CollectionModel = require("../models/collection-model");
const userModel = require("../models/user-model");

let createCollection = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: "Collection title is required." });
        }

        const collection = await CollectionModel.create({
            name: title.trim(),
            owner: req.user._id,
        });

        let user = await userModel.findOne({ _id: req.user._id });
        user.collections.push(collection._id);
        await user.save();

        res.status(201).json({ success: true, message: "Collection created successfully!", collection });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong while creating collection." });
    }
};

const addToCollection = async (req, res) => {
    const { productId, collectionId } = req.body;

    try {
        const usercollection = await CollectionModel.findOne({
            _id: collectionId,
            owner: req.user._id,
        });

        if (!usercollection) {
            return res.status(404).json({ success: false, message: "Collection not found or access denied." });
        }

        usercollection.products.push(productId);
        await usercollection.save();

        res.json({ success: true, message: "Product added to collection!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Could not add product to collection." });
    }
};

module.exports = {
    createCollection,
    addToCollection,
};
