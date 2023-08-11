const {Schema, model} = require('mongoose')
const collectionName = 'session'

const schema = Schema({
  _id: String,
  token: String,
  role: String,
  userId: String,
  userName: String,
  expiredAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false },
},{
  versionKey: false,
  collection: collectionName,
  _id: false
})

module.exports = model(collectionName, schema)