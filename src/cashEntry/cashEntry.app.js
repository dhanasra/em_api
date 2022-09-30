const { cashEntryRouter } = require('./cashEntry.router')
const { cashEntryListener } = require('./cashEntry.listener')

module.exports.cashEntryApp = function(app){
    app.use('/cashEntry', cashEntryRouter)

    cashEntryListener()
}