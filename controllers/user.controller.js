const UserService = require('../services/user.services');
/**
 * User application programing interface
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {Response}
 **/
exports.registerUser = async (req, res, next) => {
  try {
    const Result = await UserService.registerUser(req.body.formData);
    if(Result.status === 200){
      console.log(Result);  
      res.status(200).json(Result);
    }else{
      console.log(Result);
      res.status(400).json(Result.message);
    }
  } catch (err) {
    next(err);
  }
};
/**
 * Login user application programing interface
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {Response}
 **/
exports.authUser = async (req, res, next) => {
  try {
    const Result = await UserService.authUser(req.body.formData);
    if(Result.status === 200){
      console.log(Result);  
      res.status(200).json(Result);
    }else{
      console.log(Result);
      res.status(400).json(Result.message);
    }
  } catch (err) {
    next(err);
  }
};
/**
 * Get one User by id application programing interface
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {Response}
 **/
exports.getUserById = async (req, res, next) => {
  try {
    const User = await UserService.getUserById(req.params.id);
    res.json(User);
  } catch (err) {
    next(err);
  }
};
/**
 * Update User application programing interface
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {Response}
 **/
exports.updateUser = async (req, res, next) => {
  try {
    const User = await UserService.updateUser(req.params.id, req.body);
    res.json(User);
  } catch (err) {
    next(err);
  }
};
/**
 * Delete User application programing interface
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {Response}
 **/
exports.deleteUser = async (req, res, next) => {
  try {
    const User = await UserService.deleteUser(req.params.id);
    res.json(User);
  } catch (err) {
    next(err);
  }
};
