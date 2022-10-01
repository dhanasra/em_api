const { authEmitter } = require('../common/emitters/auth.emitter')

module.exports.createPasswordLinkCreated = (user, createPasswordLink) => {
  authEmitter.emit('auth.createPasswordLinkCreated', {
    user,
    createPasswordLink
  })
}

module.exports.resetPasswordLinkCreated = (user, resetPasswordLink) => {
  authEmitter.emit('auth.resetPasswordLinkCreated', {
    user,
    resetPasswordLink
  })
}
