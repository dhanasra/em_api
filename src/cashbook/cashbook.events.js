const { cashbookEmitter } = require('../common/emitters/cashbook.emitter')

module.exports.created = (cashbook) => {
    cashbookEmitter.emit(
    'cashbook.created',
    {
        cashbook
    }
  )
}

module.exports.updated = (cashbook) => {
    cashbookEmitter.emit(
    'cashbook.updated',
    {
        cashbook
    }
  )
}

module.exports.deleted = (_id) => {
    cashbookEmitter.emit(
    'cashbook.deleted',
    {
      _id
    }
  )
}
