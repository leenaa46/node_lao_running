const db = require("../models");
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Response = require('../helpers/response.helper')
const Status = require('../helpers/status.helper')
const Message = require('../helpers/message.helper')

exports.register = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password
    } = req.body;


    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({
        user_id: user._id,
        email
      },
      process.env.JWT_SECRET, {
        expiresIn: "30d",
      }
    );

    user.token = token;

    return Response.success(res, Message.success._register, user)

  } catch (err) {
    return Response.error(res, Message.serverError._serverError, err)
  }
}

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({
          user_id: user._id,
          email
        },
        process.env.JWT_SECRET, {
          expiresIn: "30d",
        }
      );

      user.token = token;

      return Response.success(res, Message.success._register, user)
    }
    return Response.error(res, Message.fail._invalidCredential, {}, Status.BadRequest)

  } catch (err) {
    return Response.error(res, Message.serverError._serverError, err)
  }
}