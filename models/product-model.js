const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
   image: String,
   name: Price,
   price: Number,
   discount: {
    type: Array,
    default: 0
   },
   bgcolor: String,
   panelcolor: String,
   textcolor: String,
});

module.exports = mongoose.model("product" , productSchema);
