const db = require("../models");
const User = db.users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Response = require('../helpers/response.helper')
const Status = require('../helpers/status.helper')
const Message = require('../helpers/message.helper')

exports.register = async (req, res) => {
  console.log(process.env.JWT_SECRET);
  // Our register logic starts here
  try {
    // Get user input
    const {
      name,
      phone,
      email,
      password
    } = req.body;

    // Validate user input
    if (!(email && password && name && phone)) {
      return Response.error(res, Message.fail._validator, {}, Status.Validation)
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (oldUser) {
      return Response.error(res, 'User is exists.', {}, Status.Validation)
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      phone,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({
        user_id: user._id,
        email
      },
      process.env.JWT_SECRET, {
        expiresIn: "30d",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return Response.success(res, Message.success._register, user)

  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}

exports.login = async (req, res) => { // Our login logic starts here
  try {
    // Get user input
    const {
      email,
      password
    } = req.body;

    // Validate user input
    if (!(email && password)) {
      return Response.error(res, Message.fail._validator, {}, Status.Validation)

    }
    // Validate if user exist in our database
    const user = await User.findOne({
      email
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({
          user_id: user._id,
          email
        },
        process.env.JWT_SECRET, {
          expiresIn: "30d",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    return Response.error(res, 'Invalid Credential.', {}, Status.BadRequest)

  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
}