class AuthError extends Error {
  constructor () {
    super('unauthorized')
    this.name = 'UNAUTHORIZED'
  }

  authErrorHandler (err, req, res) {
    return res.api(
      422,
      'validation.errors',
      {
        url: req.url,
        method: req.method,
        errors: err
      }
    )
  }

  handler (_, req, res, next) {
    return res.status(401).send({
      status: 401,
      message: 'auth.expired'
    })
  }
}

module.exports.AuthError = AuthError
