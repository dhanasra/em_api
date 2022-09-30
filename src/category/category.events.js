const { categoryEmitter } = require('../common/emitters/category.emitter')

module.exports.created = (category) => {
    categoryEmitter.emit(
    'category.created',
    {
        category
    }
  )
}

module.exports.updated = (category) => {
    categoryEmitter.emit(
    'category.updated',
    {
        category
    }
  )
}

module.exports.deleted = (_id) => {
    categoryEmitter.emit(
    'category.deleted',
    {
      _id
    }
  )
}
