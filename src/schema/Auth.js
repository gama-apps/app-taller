const UserField = `
  document: String
  first_name: String
  last_name: String
  email: String
  password: String
  departmentId: String
  roleId: String
  isLeader: Boolean
`;

const authSchema = (`
  type User {
    _id: ID
    ${UserField}
    createdAt: String 
    updatedAt: String
    isRemove: Boolean 
  }

  type Role {
    _id: ID
    name: String
  }

  type Session {
    _id: ID
    token: String
    role: String
    userId: ID
    userName: String
    expiredAt: String
  }

  
  input RegisterInput {
    ${UserField}
    createdAt: String 
    isRemove: Boolean 
  }
  
  type Mutation {
    register(input: RegisterInput): ID
    login(email: String, password: String): Session
  }
`);

module.exports = authSchema;