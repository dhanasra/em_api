const { paymentModeEmitter } = require('../common/emitters/paymentMode.emitter')

module.exports.created = (paymentMode) => {
  paymentModeEmitter.emit(
    'paymentMode.created',
    {
        paymentMode
    }
  )
}

module.exports.updated = (paymentMode) => {
  paymentModeEmitter.emit(
    'paymentMode.updated',
    {
        paymentMode
    }
  )
}

module.exports.deleted = (_id) => {
  paymentModeEmitter.emit(
    'paymentMode.deleted',
    {
      _id
    }
  )
}
