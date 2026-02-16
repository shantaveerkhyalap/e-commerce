const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, loggedin: false, success });
});

router.get("/shop", isLoggedIn ,async (req, res) => {
  try {
    const products = await productModel.find();
    const user = await userModel.findOne({ email: req.user.email }).populate("collections");

    res.render("shop", { products, user, success: req.flash("success") });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to Cart");
    res.redirect("/shop")
});

router.get("/users/orders/:productid", isLoggedIn, async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.productid });

        if (!product) {
            return res.status(404).send("Product not found");
        }

        let user = await userModel.findOne({ email: req.user.email }).populate("orders");
        user.orders.push(product._id);
        console.log(user);
        await user.save();

        const updatedUser = await userModel
            .findOne({ email: req.user.email })
            .populate("orders");

        let success = req.flash("success", "Added to user orders")
        res.render("userOrders", { success, user: updatedUser});
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// router.get("/cart" ,isLoggedIn  , async (req , res) => {
//     let user = await userModel
//     .findOne({email : req.user.email})
//     .populate("cart");
//     let bill = (Number(user.cart[0].price) + 20 - Number(user.cart[0].discount));
//     res.render("cart" , {user , bill});
// });

router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");


    const items = user.cart.map(p => {
        const itemBill = Number(p.price) + 20 - Number(p.discount || 0);
        return { ...p.toObject(), bill: itemBill };
    });

    // Total bill
    const bill = items.reduce((sum, it) => sum + it.bill, 0);

    // Send both: all items + total
    res.render("cart", { items, bill });
});




module.exports = router;
