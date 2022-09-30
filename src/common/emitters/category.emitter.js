const EventEmitter = require('events')

class CategoryEmitter extends EventEmitter {
  emit (event, data, ...args) {
    return super.emit(event, data, ...args)
  }
}

module.exports.categoryEmitter = new CategoryEmitter()
