const { userRouter } = require('./user.router')
const { userListener } = require('./user.listener')

module.exports.userApp = function(app){
    app.use('/user', userRouter)

    userListener()
}