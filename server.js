require("dotenv").config();
const express = require("express");
const loggingMiddleware = require("./middleware/logging");
const userRoutes = require("./routes/userRoutes");
const dbConnect = require("./config/database");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(loggingMiddleware);
// app.use(cors());
// {
//   origin: ["https://localhost:5173"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// }

// Allow requests from specified origins
const allowedOrigins = ["https://localhost:5174", "http://localhost:5173"]; // Add your frontend domain(s)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS".origin));
    }
  },
};

app.use(cors(corsOptions));

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
