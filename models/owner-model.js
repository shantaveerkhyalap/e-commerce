const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    isadmin: {
        type: Boolean,
        default: false,
    },
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    collections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
});

module.exports = mongoose.model("owner", ownerSchema);