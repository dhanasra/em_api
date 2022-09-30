const { partyRouter } = require('./party.router')
const { partyListener } = require('./party.listener')

module.exports.partyApp = function(app){
    app.use('/party', partyRouter)

    partyListener()
}