import db from "../../models";
const User = db.users;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';

exports.register = async (req, res) => {
  try {
    const transaction = await db.sequelize.transaction();

    const {
      name,
      phone,
      email,
      password
    } = req.body;

    const encryptedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = await User.create({
      name,
      phone,
      email: email ? email.toLowerCase() : null,
      password: encryptedPassword,
    }, {
      transaction
    });

    const token = jwt.sign({
        user_id: user.id,
        email
      },
      process.env.JWT_SECRET, {
        expiresIn: "30d",
      }
    );

    user.token = token;
    await transaction.commit()
    return Response.success(res, Message.success._register, user);

  } catch (err) {
    // await transaction.rollback()

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
      where: {
        email: email
      }
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
    return Response.error(res, Message.fail._invalidCredential, {}, Status.code.BadRequest)

  } catch (err) {
    return Response.error(res, Message.serverError._serverError, err)
  }
}