const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
require("dotenv").config(); 

mongoose
    .connect(`${process.env.MONGO_URI}/scatch`)
    .then(() => {
        dbgr("connected");
    })
    .catch((err) => { 
        console.log(err);
    });

module.exports = mongoose.connection;
