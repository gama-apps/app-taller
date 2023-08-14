const roleSchema = [`
  type ARQ_Role {
    _id: String
    name: String
    createdAt: String 
    updatedAt: String
    isRemove: Boolean
  }

  input ARQ_Role_input {
    _id: String
    name: String
  }

  input ARQ_Role_filter {
    _id: String
    name: String
  }

  type Query {
    ARQ_Role(filter: ARQ_Role_filter): [ARQ_Role]
    ARQ_Role_count(filter: input ARQ_Role_filter):Int
  }

  type Mutation {
    ARQ_Role_save(input: ARQ_Role_input):ID
    ARQ_Role_delete(_id: String!):Boolean
  }
`]

module.exports = roleSchema;