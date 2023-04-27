const express = require("express");
const { registerUser, authUser, getUserById, updateUser,deleteUser } = require("../controllers/user.controller.js");
const router = express.Router();
import { protectUser } from "../middleware/authUser.js";

//Routes for User Account Operations
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/:id").get(protectUser, getUserById);
router.route("/:id").put(protectUser, updateUser);
router.route("/:id").delete(protectUser, deleteUser);


module.exports = router;
