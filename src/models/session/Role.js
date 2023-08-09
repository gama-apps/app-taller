const { Schema, model } = require('mongoose')
const collectionName = 'role'

const schema = Schema({
    _id: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRemove: { type: Boolean, default: false },
},{
    versionKey: false,
    collection: collectionName,
    _id: false
  })

  module.exports = model(collectionName, schema)