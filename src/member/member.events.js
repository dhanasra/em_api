const { memberEmitter } = require('../common/emitters/member.emitter')

module.exports.created = (member) => {
    memberEmitter.emit(
    'member.created',
    {
        member
    }
  )
}

module.exports.updated = (member) => {
    memberEmitter.emit(
    'member.updated',
    {
        member
    }
  )
}

module.exports.deleted = (_id) => {
    memberEmitter.emit(
    'member.deleted',
    {
      _id
    }
  )
}
