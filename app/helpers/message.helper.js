exports.success = {
  _success: 'success.',
}

exports.fail = {
  _validation: 'validation error.',
  _notFound: (value = null) => {
    return `${value} not found.`
  },
  _invalidCredential: 'invalid Credential.',
  _invalidToken: 'Invalid token.',
  _noToken: 'A token is required for authentication',
  _badRole: 'can not access with current role.',
  _routeNotfound: 'Route not found.',
  _unAutorize: 'UnAutorize.',
  _userAreadyPaid: 'User aready had a package.'
}

exports.serverError = {
  _serverError: 'some thing when wrong.'
}

exports.validation = (validationCase, key, value = null) => {
  switch (validationCase) {
    case 'required':
      return `${key} is required.`
    case 'exists':
      return `${key} is exists.`
    case 'not_exists':
      return `${key} is not exists.`
    case 'min':
      return `${key} can not be less than ${value}.`
    case 'is_email':
      return `${key} must be an valid email.`
  }
}