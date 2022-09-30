const EventEmitter = require('events')

class PartyEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.partyEmitter = new PartyEmitter()
