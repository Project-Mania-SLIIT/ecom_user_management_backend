const express = require("express");
const { registerUser, authUser, getUserById, updateUser,deleteUser } = require("../controllers/user.controller.js");
const router = express.Router();
const {protectUser} = require("../middleware/authUserMiddleware.js");

//Routes for User Account Operations
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id").get(protectUser, getUserById);
router.route("/:id").put(protectUser, updateUser);
router.route("/:id").delete(protectUser, deleteUser);


module.exports = router;
