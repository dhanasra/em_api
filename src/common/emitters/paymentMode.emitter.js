const EventEmitter = require('events')

class PaymentModeEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.paymentModeEmitter = new PaymentModeEmitter()
