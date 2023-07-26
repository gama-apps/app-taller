const ARQ_InventorySchema = [`

  type ARQ_Inventory {
    _id: String
    key: String
    name: String
    quantity: Int
    isAvailable: Boolean
    department: String
    createdAt: String
    updatedAt: String
    isRemove: Boolean
  }

  input ARQ_Inventory_input {
    _id: String
    key: String
    name: String
    quantity: Int
    isAvailable: Boolean
    department: String
  }

  input ARQ_Inventory_filter {
    _id: String
    key: String
    name: String
    quantity: Int
    isAvailable: Boolean
    department: String
  }

  type Query {
    ARQ_Inventory(filter: ARQ_Inventory_filter):[ARQ_Inventory]
    ARQ_Inventory_count(filter: ARQ_Inventory_filter):Int
  }

  type Mutation {
    ARQ_Inventory_save(inventoryInput: ARQ_Inventory_input):ID
    ARQ_Inventory_delete(_id: String!):Boolean
  }
`]

module.exports = ARQ_InventorySchema;
