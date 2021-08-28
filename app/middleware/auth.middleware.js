import jwt from "jsonwebtoken";
import Response from '../helpers/response.helper'
import Message from '../helpers/message.helper'
import Status from '../helpers/status.helper'

const verifyToken = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

  if (token.substring(0, 6) === 'Bearer') {
    const bearer = token.split(' ');
    token = bearer[1];
  }

  if (!token) {
    return Response.error(res, Message.fail._noToken, {}, Status.code.AuthError)
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
  } catch (err) {
    return Response.error(res, Message.fail._invalidToken, err, Status.code.Unauthorized)
  }
  return next();
};

module.exports = verifyToken;