const EventEmitter = require('events')

class CashbookEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.cashbookEmitter = new CashbookEmitter()
