const EventEmitter = require('events')

class AuthEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.authEmitter = new AuthEmitter()
