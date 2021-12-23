import db from "../../models";
const User = db.User;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';
import Image from '../helpers/upload.helper'
import createError from 'http-errors'
import {
  create
} from "qrcode";

/**
 * Validate Step 1.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.validateFirst = async (req, res, next) => {
  let errors = {}

  try {

    const { name, surname } = req.body

    const user = await db.UserProfile.findOne({
      where: [{
        name: name
      },
      {
        surname: surname
      }]
    })

    if (user) errors.name = Message.validation('exists', '\"name\"')


    if (!Object.keys(errors).length)
      return Response.success(res, Message.success._success, { message: "success" });

    return res.status(422).json(
      {
        name: "ValidationError",
        message: "Validation Failed",
        statusCode: 422,
        error: "Unprocessable Entity",
        details: [
          errors
        ]
      }
    )
  } catch (error) {
    next(error)
  }
}

/**
 * Validate Step 1.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.validateSecond = async (req, res, next) => {
  let errors = {}

  try {
    const email = req.body.email

    if (await User.findOne({
      where: {
        email: email,
      }
    })) errors.email = Message.validation('exists', '\"email\"')


    if (!Object.keys(errors).length)
      return Response.success(res, Message.success._success, { message: "success" });

    return res.status(422).json(
      {
        name: "ValidationError",
        message: "Validation Failed",
        statusCode: 422,
        error: "Unprocessable Entity",
        details: [
          errors
        ]
      }
    )
  } catch (error) {
    next(error)
  }
}

/**
 * Register User.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.register = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {
      name,
      surname,
      phone,
      email,
      password,
      national_id,
      gender,
      dob,
    } = req.body

    const encryptedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = await db.User.create({
      name: name,
      phone: phone,
      email: email,
      password: encryptedPassword,
      is_active: true
    }, {
      transaction: transaction
    });

    const roleUser = await db.Role.findOne({
      where: {
        name: 'User'
      }
    })

    await user.addRole(roleUser, {
      transaction: transaction
    })

    let profile_image = req.file ? await Image.upload(req.file) : null

    await user.createUserProfile({
      name: name,
      surname: surname,
      gender: gender,
      national_id: national_id,
      dob: dob,
      bib: user.id.toString().padStart(5, '0'),
      profile_image: profile_image ? profile_image.secure_url : null,
      profile_image_id: profile_image ? profile_image.public_id : null,
    }, {
      transaction: transaction
    })



    const token = jwt.sign({
      user_id: user.id,
      email,
    },
      process.env.JWT_SECRET, {
      expiresIn: "30d",
    }
    );

    await transaction.commit()

    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      role: await user.getRoles(),
      token: token,
    }


    return Response.success(res, Message.success._success, userData);

  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

/**
 * Login User.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email ? req.body.email : null
    const password = req.body.password ? req.body.password : null

    const user = await db.User.findOne({
      where: {
        email: email
      }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const role = await user.getRoles()
      const token = jwt.sign({
        user_id: user.id,
        email,
      },
        process.env.JWT_SECRET, {
        expiresIn: "30d",
      }
      );

      const userData = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        role: role,
        token: token,

      }



      return Response.success(res, Message.success._success, userData)
    }
    next(createError(Status.code.BadRequest, Message.fail._invalidCredential))

  } catch (error) {
    next(error)
  }
}

/**
 * Get User from token.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.me = async (req, res, next) => {
  try {
    const userData = req.user
    return Response.success(res, Message.success._success, userData)
  } catch (error) {
    next(error)
  }
}

/**
 * Create Admin.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.createAdmin = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {
      name,
      phone,
      email,
      password,
    } = req.body

    const encryptedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = await db.User.create({
      name: name,
      phone: phone,
      email: email,
      password: encryptedPassword,
      is_active: true
    }, {
      transaction: transaction
    });

    const roleUser = await db.Role.findOne({
      where: {
        name: 'Admin'
      }
    })

    await user.addRole(roleUser, {
      transaction: transaction
    })

    const token = jwt.sign({
      user_id: user.id,
      email,
    },
      process.env.JWT_SECRET, {
      expiresIn: "30d",
    }
    );

    await transaction.commit()

    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      role: await user.getRoles(),
      token: token,
    }


    return Response.success(res, Message.success._success, userData);

  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

/**
 * Get Admin.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.getAllAdmin = async (req, res, next) => {
  try {
    const roleUser = await db.Role.findOne({
      where: {
        name: 'Admin'
      },
    })

    const userData = await roleUser.getUsers({
      attributes: ['id', 'name', 'email', 'phone']
    })

    return Response.success(res, Message.success._success, userData);

  } catch (error) {
    next(error)
  }
}