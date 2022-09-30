const { memberRouter } = require('./member.router')
const { memberListener } = require('./member.listener')

module.exports.memberApp = function(app){
    app.use('/member', memberRouter)

    memberListener()
}