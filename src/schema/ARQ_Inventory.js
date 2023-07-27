const inventoryFields = `
    _id: String
    key: String
    name: String
    quantity: Int
    isAvailable: Boolean`;

const ARQ_InventorySchema = [`

  type ARQ_Inventory {
    ${inventoryFields}
    departmentId: ARQ_Department
    createdAt: String
    updatedAt: String
    isRemove: Boolean
  }

  input ARQ_Inventory_input {
    ${inventoryFields}
    departmentId: String
  }

  input ARQ_Inventory_filter {
    ${inventoryFields}
    departmentId: String
  }

  type Query {
    ARQ_Inventory(filter: ARQ_Inventory_filter):[ARQ_Inventory]
    ARQ_Inventory_count(filter: ARQ_Inventory_filter):Int
  }

  type Mutation {
    ARQ_Inventory_save(inventoryInput: ARQ_Inventory_input):ID
    ARQ_Inventory_delete(_id: String!):Boolean
  }
`];

module.exports = ARQ_InventorySchema;
