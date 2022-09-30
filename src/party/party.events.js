const { partyEmitter } = require('../common/emitters/party.emitter')

module.exports.created = (party) => {
    partyEmitter.emit(
    'party.created',
    {
        party
    }
  )
}

module.exports.updated = (party) => {
    partyEmitter.emit(
    'party.updated',
    {
        party
    }
  )
}

module.exports.deleted = (_id) => {
    partyEmitter.emit(
    'party.deleted',
    {
      _id
    }
  )
}
