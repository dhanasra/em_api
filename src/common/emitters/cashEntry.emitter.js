const EventEmitter = require('events')

class CashEntryEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.cashEntryEmitter = new CashEntryEmitter()
