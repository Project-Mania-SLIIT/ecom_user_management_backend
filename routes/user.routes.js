const express = require("express");
const { registerUser, authUser, getUserById, updateUser,deleteUser,getAllUser,updateUserType } = require("../controllers/user.controller.js");
const router = express.Router();
const {protectUser} = require("../middleware/authUserMiddleware.js");

//Routes for User Account Operations
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route('/all').get(getAllUser)
router.route("/:id").get( getUserById);
router.route("/:id").put( updateUser);
router.route("/updatetype/:id").put( updateUserType);
router.route("/:id").delete( deleteUser);


module.exports = router;
