require("dotenv").config();
const express = require("express");
const loggingMiddleware = require("./middleware/logging");
const userRoutes = require("./routes/userRoutes");
const dbConnect = require("./config/database");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(loggingMiddleware);

// routes
app.use("/api/users", userRoutes);

// connnect DB
dbConnect()
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
