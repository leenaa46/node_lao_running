exports.success = {
  _success: 'success.',
}

exports.fail = {
  _validation: 'validation error.',
  _notFound: 'not found.',
  _invalidCredential: 'invalid Credential.',
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
  }
}