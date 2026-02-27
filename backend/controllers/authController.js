const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

let registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email });
        let owner = await ownerModel.findOne({ email });
        if (user || owner)
            return res.status(400).json({ success: false, message: "You already have an account, please login" });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            fullname,
            email,
            password: hash,
        });

        let token = generateToken(createdUser);
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ success: true, message: "Account created successfully", user: { fullname: createdUser.fullname, email: createdUser.email } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

let loginUser = async (req, res) => {
    try {
        let { password, email } = req.body;

        // Try to find user in User model first, then Owner model
        let user = await userModel.findOne({ email });
        if (!user) {
            user = await ownerModel.findOne({ email });
        }

        if (!user)
            return res.status(401).json({ success: false, message: "Email or password is incorrect" });

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.json({ success: true, message: "Logged in successfully", user: { fullname: user.fullname, email: user.email } });
        } else {
            res.status(401).json({ success: false, message: "Email or password is incorrect" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
