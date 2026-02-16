const ownerModel = require("../models/owner-model");

module.exports = async function isOwner(req, res, next) {
  try {

    if ( !req.user) {
      return res.status(401).send("You must be logged in");
    }

    const user = await ownerModel.findOne({ email: req.user.email });

    // Check if user is admin
    if (user && user.isadmin) {
      return next();
    }

    // Not an admin
    return res.status(403).send("Access denied. Not an owner.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error in isOwner middleware");
  }
};

// const ownerModel = require("../models/owner-model");

// const isOwner = async (req, res, next) => {
//   try {
//     // If using session-based auth
//     const ownerId = req.session.owner._id

//     // If using JWT-based auth (uncomment if you're using JWT)
//     // const ownerId = req.user?._id;

//     if (!ownerId) {
//       return res.status(401).send("Unauthorized: Owner login required");
//     }

//     const owner = await ownerModel.findOne({_id: ownerId});

//     if (!owner) {
//       return res.status(403).send("Forbidden: Owner not found");
//     }

//     req.owner = owner; // Attach owner to request for further use
//     next();
//   } catch (error) {
//     console.error("Error in isOwner middleware:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = isOwner;

