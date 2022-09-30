const { paymentModeRouter } = require('./paymentMode.router')
const { paymentModeListener } = require('./paymentMode.listener')

module.exports.paymentModeApp = function(app){
    app.use('/paymentMode', paymentModeRouter)

    paymentModeListener()
}