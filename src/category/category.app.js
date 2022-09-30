const { categoryRouter } = require('./category.router')
const { categoryListener } = require('./category.listener')

module.exports.categoryApp = function(app){
    app.use('/category', categoryRouter)

    categoryListener()
}