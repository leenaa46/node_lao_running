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

    const name = req.body.name ? req.body.name : null
    const surname = req.body.surname ? req.body.surname : null
    const phone = req.body.phone ? req.body.phone : null
    const email = req.body.email ? req.body.email : null
    const password = req.body.password ? req.body.password : null
    const package_id = req.body.package_id ? req.body.package_id : null

    const encryptedPassword = password ? await bcrypt.hash(password, 10) : null;
    const is_active = package_id == 1 ? true : false;
    const status = package_id == 1 ? Status.userPackageStatus.Success : Status.userPackageStatus.Pending;

    const user = await db.User.create({
      name,
      phone,
      email,
      password: encryptedPassword,
      package_id,
      is_active: is_active
    }, {
      transaction: transaction
    });

    await user.createUserProfile({
      name,
      surname
    }, {
      transaction: transaction
    })


    let cloudImage
    if (req.file) {
      cloudImage = await Image.upload(req.file)
    }

    await user.createUserPackage({
      package_id,
      status: status,
      payment_slip: cloudImage ? cloudImage.secure_url : null
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