const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const ownerModel = require("../models/owner-model");
const upload = require("../config/multer-config");

router.post("/create" , upload.single("image") ,async (req , res) => {
   try{ 
    const ownerId = req.session.owner._id

    let { name, price, discount, bgcolor, panelcolor, textcolor,} = req.body;
    let product = await productModel.create({
        image: req.file.buffer,
        name, 
        price, 
        discount, 
        bgcolor, 
        panelcolor, 
        textcolor,
        owner: ownerId,
    });

    let owner = await ownerModel.findOne({_id: ownerId});
    owner.products.push(product._id);
    await owner.save();

    product = await productModel.findOne({_id: product._id}).populate("owner");
    console.log(owner);
    console.log(product);
    
    req.flash("success" , "product created succesfully");
    res.redirect("/owners/admin");
    } catch(err) {
        res.send(err.message);
    }
});

module.exports = router;