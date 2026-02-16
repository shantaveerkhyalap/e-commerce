const CollectionModel = require("../models/collection-model");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const collectionModel = require("../models/collection-model");

// GET: render the create collection form
let renderCreateForm = (req, res) => {
    let success = req.flash("succces");
    let error = req.flash("error");

    res.render("createCollections", { success, error });
};

let createCollection = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            req.flash("error", "Collection title is required.");
            return res.redirect("/users/newCollection");
        }

        const collection = await CollectionModel.create({
            name: title.trim(),
            owner: req.user._id, // logged-in user
        });

        // await userModel.findByIdAndUpdate(req.user._id, {
        //     $push: { collections: collection._id },
        // });

        let user = await userModel.findOne({_id: req.user._id});
        user.collections.push(collection._id);
        await user.save();

        req.flash("success", "Collection created successfully!");
        return res.redirect("/users/collections");
    }
    catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while creating collection.");
        return res.redirect("/users/newCollection");
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
            req.flash("error", "Collection not found or access denied.");
            return res.redirect("/shop");
        }

        const collection = await CollectionModel.findOne({_id: collectionId});
        collection.products.push(productId);
        await collection.save(); 
        
        req.flash("success", "Product added to collection!");
        res.redirect("/shop");
    }
    catch (err) {
        console.error(err);
        req.flash("error", "Could not add product to collection.");
        res.redirect("/shop");
    }
};



module.exports = {
    createCollection,
    renderCreateForm,
    addToCollection
};