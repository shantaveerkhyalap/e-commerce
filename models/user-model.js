const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fulname: {
        type: String,
        minLength: 3,
        trim: true
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
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("user", userSchema);
