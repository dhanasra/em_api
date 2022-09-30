const { userEmitter } = require('../common/emitters/user.emitter')

module.exports.created = (user) => {
  userEmitter.emit(
    'user.created',
    {
      user
    }
  )
}

module.exports.updated = (user) => {
  userEmitter.emit(
    'user.updated',
    {
      user
    }
  )
}

module.exports.deleted = (_id) => {
  userEmitter.emit(
    'user.deleted',
    {
      _id
    }
  )
}

module.exports.logout = (user) => {
  userEmitter.emit(
    'user.logout',
    {
      user
    }
  )
}
