import Response from '../helpers/response.helper'
import Message from '../helpers/message.helper'
import Status from '../helpers/status.helper'

exports.hasRole = role => {
  return (req, res, next) => {
    try {
      req.user.role.forEach(userRole => {
        if (userRole.name == role) {
          return next();
        }
      });
    } catch (error) {
      return Response.error(res, Message.fail._badRole, error, Status.code.AuthError)
    }

    return Response.error(res, Message.fail._badRole, {
      required_role: role
    }, Status.code.AuthError)
  };
}