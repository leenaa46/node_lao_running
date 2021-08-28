import Response from '../helpers/response.helper'
import Message from '../helpers/message.helper'
import Status from '../helpers/status.helper'

exports.hasRole = role => {
  return (req, res, next) => {
    let hasRole = false
    try {
      req.user.role.some(userRole => {
        if (userRole.name == role) {
          hasRole = true
          throw hasRole
        }
      });
    } catch (error) {
      if (error !== hasRole)
        return Response.error(res, Message.fail._badRole, error, Status.code.AuthError)
    }
    console.log(hasRole);
    if (!hasRole)
      return Response.error(res, Message.fail._badRole, {
        required_role: role
      }, Status.code.AuthError)

    return next()
  };
}