import db from "../../models";
const User = db.User;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';
import Image from '../helpers/upload.helper'

/**
 * Register User.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.register = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {
      name,
      surname,
      phone,
      email,
      password,
      national_id,
      hal_branche_id,
      gender,
      dob,
    } = req.body

    const encryptedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = await db.User.create({
      name,
      phone,
      email,
      password: encryptedPassword,
      is_active: true
    }, {
      transaction: transaction
    });

    let identity_image, profile_image

    if (req.files) {
      identity_image = req.files.identity_image ? await Image.upload(req.files.identity_image[0]) : null
      profile_image = req.files.profile_image ? await Image.upload(req.files.profile_image[0]) : null
    }

    await user.createUserProfile({
      name,
      surname,
      gender,
      national_id,
      hal_branche_id,
      dob,
      profile_image: profile_image.secure_url,
      profile_image_id: profile_image.public_id,
      identity_image: identity_image.secure_url,
      identity_image_id: identity_image.public_id,
    }, {
      transaction: transaction
    })

    await user.createUserPackage({
      package_id: 1
    }, {
      transaction: transaction
    })

    const roleUser = await db.Role.findOne({
      where: {
        name: 'User'
      }
    })

    user.addRoles([roleUser])

    const token = jwt.sign({
        user_id: user.id,
        email,
        role: roleUser
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
      token: token,
    }

    await transaction.commit()
    return Response.success(res, Message.success._success, userData);

  } catch (err) {
    await transaction.rollback()
    return Response.error(res, Message.serverError._serverError, err)
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
exports.login = async (req, res) => {
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
          role: role
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
        token: token,

      }



      return Response.success(res, Message.success._success, userData)
    }
    return Response.error(res, Message.fail._invalidCredential, {}, Status.code.BadRequest)

  } catch (err) {
    return Response.error(res, Message.serverError._serverError, err)
  }
}