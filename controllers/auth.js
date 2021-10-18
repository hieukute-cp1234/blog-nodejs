const users = require("../models/user");
const JWT = require("../helpers/jwt");
const response = require("../helpers/response");
const message = require("../constants/message");
const check = require("../helpers/validate");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    if (!email || !password) {
      return res.status(400).json(response(null, message.register.required));
    }

    if (!check(email, password)) {
      return res.status(400).json(response(null, message.register.validate));
    }

    const checkEmail = await users.findOne({ email });

    if (checkEmail) {
      return res.status(401).json(response(null, message.register.exist));
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const handlePass = bcrypt.hashSync(password, salt);

    const newUser = {
      email: email,
      password: handlePass,
      userName: userName,
    };
    const result = await users.create(newUser);
    return res.status(200).json(response(result, message.register.success));
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(response(null, message.register.required));
    }

    if (!check(email, password)) {
      return res.status(400).json(response(null, message.register.validate));
    }

    const checkEmail = await users.findOne({ email });
    if (!checkEmail) {
      return res.status(401).json(response(null, message.login.emailExist));
    }

    const checkPassword = await checkEmail.comparePass(password);
    if (!checkPassword) {
      return res.status(401).json(response(null, message.login.passwordWrong));
    }

    const token = await JWT.generateToken(checkEmail._id);
    return res.status(200).json(response(token, message.login.success));
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
};
