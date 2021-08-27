import db from "../../models";
const User = db.User;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';
import Cloudinary from '../utils/cloudinary'
import Sharp from 'sharp'
import fs from 'fs'
import path from 'path'

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

    await db.UserProfile.create({
      user_id: user.id,
      name,
      surname
    }, {
      transaction: transaction
    })

    let cloudImage
    if (req.file) {
      const {
        filename: image
      } = req.file;

      const originalImage = req.file.destination + image;
      const resizedImage = req.file.destination + 'payment_' + image
      await Sharp(originalImage)
        .resize({
          width: 720
        })
        .jpeg({
          quality: 90
        })
        .toFile(
          resizedImage
        )

      cloudImage = await Cloudinary.uploader.upload(resizedImage)

      fs.unlinkSync(originalImage)
      fs.unlinkSync(resizedImage)
    }

    await db.UserPackage.create({
      user_id: user.id,
      package_id,
      status: status,
      payment_slip: cloudImage.secure_url
    }, {
      transaction: transaction
    })

    const token = jwt.sign({
        user_id: user.id,
        email
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
    return Response.success(res, Message.success._register, userData);

  } catch (err) {
    console.log(err);
    await transaction.rollback()

    return Response.error(res, Message.serverError._serverError, err)
  }
}

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
      const token = jwt.sign({
          user_id: user.id,
          email
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

      return Response.success(res, Message.success._register, userData)
    }
    return Response.error(res, Message.fail._invalidCredential, {}, Status.code.BadRequest)

  } catch (err) {
    console.log(err);
    return Response.error(res, Message.serverError._serverError, err)
  }
}