const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteUsers,
} = require("../controllers/userController");

// GET all users
router.get("/", getUsers);

// GET a user
router.get("/:id", getUser);

// POST a new user
router.post("/", createUser);

// UPDATE
router.patch("/:id", updateUser);

// DELETE a user
router.delete("/:id", deleteUser);

// DELETE all users
router.delete("/", deleteUsers);

module.exports = router;
