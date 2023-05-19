const {validateUser} = require('../validation/user.validation')
/**
 * @file Product service
 * @summary Product realated services
 */
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { validateUser } = require('../validation/user.validation');
/**
 * add User service
 * @param {Object} UserData
 * @param {Array} imageUrl
 * @returns {Promise<Object>}
 */
exports.registerUser = async (UserData) => { 
	console.log(UserData)
	//validation
	const { error } = validateUser(UserData);
	if (error)
	return {
		message: error.details[0].message,
		status: 400,
	}
	const isUser = await User.findOne({ email: UserData.email });
	if (isUser) {
		return {
			message: "Already Registered !",
			status: 400,
		}
	}
    
	const newUser = new User(UserData);

	const salt = await bcrypt.genSalt(10);

	newUser.password = await bcrypt.hash(UserData.password, salt);

	await newUser.save();

	if (newUser) {
		return {
            user : newUser,
			token: generateToken(User._id),
			status: 200,
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
		return {
			message: "No User Registered with this Email !",
			status: 400,
		}
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return {
			message: "Invalid Password !",
			status: 400,
		}
	} else {
		return {
			user:user,
			token: generateToken(user._id),
			status: 200,
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
 * Get all User  service
 * @param {String} id
 * @returns {Promise<Object>}
 */
exports.getAllUser = async () => {
	const user = await User.find();
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
 * Update User service
 * @param {String} id
 * @param {Object} updates
 * @returns {Promise<Object>}
 */
exports.updateUserType = async (id, updates) => {
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
