const EventEmitter = require('events')

class UserEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.userEmitter = new UserEmitter()
