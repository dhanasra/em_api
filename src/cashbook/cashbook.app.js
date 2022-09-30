const { cashbookRouter } = require('./cashbook.router')
const { cashbookListener } = require('./cashbook.listener')

module.exports.cashbookApp = function(app){
    app.use('/cashbook', cashbookRouter)

    cashbookListener()
}