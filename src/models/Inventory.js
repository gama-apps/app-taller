const { Schema, model } = require("mongoose");
const collectionName = "Inventory";

const schema = Schema(
  {
    _id: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    quantity: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    departmentId: { type: String, required: true, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRemove: { type: Boolean, default: false },
  },
  {
    collection: collectionName,
    _id: false,
  }
);

module.exports = model(collectionName, schema);
