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