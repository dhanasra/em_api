const { authListener } = require('./auth.listener')
const { authRouter } = require('./auth.router')

module.exports.authApp = function (app) {
  app.use('/auth', authRouter)

  authListener()
}
