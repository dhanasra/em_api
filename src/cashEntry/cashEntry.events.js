const { cashEntryEmitter } = require('../common/emitters/cashEntry.emitter')

module.exports.created = (cashEntry) => {
    cashEntryEmitter.emit(
    'cashEntry.created',
    {
        cashEntry
    }
  )
}

module.exports.updated = (cashEntry) => {
    cashEntryEmitter.emit(
    'cashEntry.updated',
    {
        cashEntry
    }
  )
}

module.exports.deleted = (_id) => {
    cashEntryEmitter.emit(
    'cashEntry.deleted',
    {
      _id
    }
  )
}
