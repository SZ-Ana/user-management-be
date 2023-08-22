const mongoose = require("mongoose");

// connect to db
const dbConnect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
};

module.exports = dbConnect;
