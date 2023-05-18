const express = require("express");
const { registerUser, authUser, getUserById, updateUser,deleteUser } = require("../controllers/user.controller.js");
const router = express.Router();
// import { protectUser } from "../middleware/authUser.js";

//Routes for User Account Operations
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id").get( getUserById);
router.route("/:id").put( updateUser);
router.route("/:id").delete( deleteUser);


module.exports = router;
