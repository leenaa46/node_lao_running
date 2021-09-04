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

    let profile_image = req.file ? await Image.upload(req.file) : null

    await user.createUserProfile({
      name: name,
      surname: surname,
      gender: gender,
      national_id: national_id,
      dob: dob,
      profile_image: profile_image ? profile_image.secure_url : null,
      profile_image_id: profile_image ? profile_image.public_id : null,
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
    console.log(err);
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