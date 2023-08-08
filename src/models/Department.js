const { Schema, model } = require('mongoose');
const collectionName = 'department';

const schema = Schema({
  _id: { type: String, required: true },
  key: { type: String, unique: true, required: true },
  name: { type: String, default: '' },
  users: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false },
},{
  versionKey: false,
  collection: collectionName,
  _id: false
},{
  collection: collectionName,
  _id: false,
});

module.exports = model(collectionName, schema)
