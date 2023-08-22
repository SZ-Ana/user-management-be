const mongoose = require("mongoose");

exports.isValidObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTP_STATUS_NOT_FOUND).json({ error: "No such user" });
  }
  next();
};
