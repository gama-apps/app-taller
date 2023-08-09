const {Schema, model} = require('mongoose');
const collectionName = 'profile';

const schema = Schema({
  _id: { type: String },
  id: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  departmentId: { type: String },
  roleId: { type: String },
  isLeader: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false },
},{
  versionKey: false,
  collection: collectionName,
  _id: false
})

module.exports = model(collectionName, schema)