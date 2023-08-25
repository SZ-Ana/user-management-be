const mongoose = require("mongoose");
const User = require("../models/userModel");
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require("../constants/httpStatusCodes");

const handleSuccess = (res, data) => {
  res.status(HTTP_STATUS_OK).json(data);
};

const handleError = (res, statusCode, errorMessage) => {
  res.status(statusCode).json({ error: errorMessage });
};

const createUser = async (req, res) => {
  const { username, firstname, lastname, email, contactNumber, password } =
    req.body;

  try {
    const user = await User.create({
      username,
      firstname,
      lastname,
      email,
      contactNumber,
      password,
    });
    handleSuccess(res, user);
  } catch (error) {
    handleError(res, HTTP_STATUS_BAD_REQUEST, error.message);
  }
};

// get users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  console.log(users);
  handleSuccess(res, users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleError(res, HTTP_STATUS_NOT_FOUND, "No such user");
    return;
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      handleError(res, HTTP_STATUS_NOT_FOUND, "No such user");
      return;
    }
    handleSuccess(res, user);
  } catch (error) {
    handleError(res, HTTP_STATUS_INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, firstname, lastname, email, contactNumber } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleError(res, HTTP_STATUS_NOT_FOUND, "No such user");
    return;
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, firstname, lastname, email, contactNumber },
      { new: true }
    );
    if (!user) {
      handleError(res, HTTP_STATUS_NOT_FOUND, "No such user");
      return;
    }
    handleSuccess(res, user);
  } catch (error) {
    handleError(res, HTTP_STATUS_INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleError(res, HTTP_STATUS_NOT_FOUND, "No such user");
    return;
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      handleError(res, HTTP_STATUS_NOT_FOUND, "No such user");
      return;
    }
    handleSuccess(res, user);
  } catch (error) {
    handleError(res, HTTP_STATUS_INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    await User.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, msg: "Deleted all User" });
  } catch {
    throw new Error("Test");
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteUsers,
};
