const deparmentFields = `
    _id: String
    key: String
    name: String
`

const ARQ_DepartmentSchema = [`
  
    type ARQ_Department {
      ${deparmentFields}
      #users: [ARQ_User]
      createdAt: String
      updatedAt: String
      isRemove: Boolean
    }

    input ARQ_Department_input {
      ${deparmentFields}
      #users: [ARQ_User]
    }

    input ARQ_Department_filter {
      ${deparmentFields}
      #users: [ARQ_User]
    }

    type Query {
      ARQ_Department(filter: ARQ_Department_filter):[ARQ_Department]
      ARQ_Department_count(filter: ARQ_Department_filter):Int
    }

    type Mutation {
      ARQ_Department_save(departmentInput: ARQ_Department_input):ID
      ARQ_Department_delete(_id: String!):Boolean
    }
`];

module.exports = ARQ_DepartmentSchema;