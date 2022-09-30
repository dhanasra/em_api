const EventEmitter = require('events')

class MemberEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.memberEmitter = new MemberEmitter()
