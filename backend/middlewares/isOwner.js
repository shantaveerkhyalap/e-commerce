const ownerModel = require("../models/owner-model");

module.exports = async function isOwner(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "You must be logged in" });
        }
        const user = await ownerModel.findOne({ email: req.user.email });
        if (user && user.isadmin) {
            return next();
        }
        return res.status(403).json({ success: false, message: "Access denied. Not an owner." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error in isOwner middleware" });
    }
};
