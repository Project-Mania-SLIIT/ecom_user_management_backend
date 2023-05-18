const {validateUser} = require('../validation/user.validation')
/**
 * @file Product service
 * @summary Product realated services
 */
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
/**
 * add User service
 * @param {Object} UserData
 * @param {Array} imageUrl
 * @returns {Promise<Object>}
 */
exports.registerUser = async (UserData) => {
	//validation
	// const { error } = validateUser(UserData);
	// if (error)
	//    return res.status(400).send({ message: error.details[0].message });
	const isUser = await User.findOne({ email: UserData.email });
	if (isUser) {
		throw new Error("Profile Exists !");
	}
    
	const newUser = new User(UserData);

	const salt = await bcrypt.genSalt(10);

	newUser.password = await bcrypt.hash(UserData.password, salt);

	await newUser.save();

	if (newUser) {
		return {
            user : newUser,
			token: generateToken(User._id),
		};
	} else {
		throw new Error("Registration Failed !");
	}
};
/**
 * Get all Users service
 * @returns {Promise<Array>}
*/
exports.authUser = async (userData) => {
    const { email, password } = userData;

	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("No any registered account for this email");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Invalid Password");
	} else {
		return {
			user:user,
			token: generateToken(user._id),
		};
	}
};
/**
 * Get one User by id service
 * @param {String} id
 * @returns {Promise<Object>}
 */
exports.getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};
/**
 * Update User service
 * @param {String} id
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
exports.updateUser = async (id, updates) => {
  const user = await User.findByIdAndUpdate(id, updates, { new: true }); 
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
/**
 * Delete User service
 * @param {String} id
 * @returns {Promise<Object>}
 */
exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
