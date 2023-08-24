const UserField = `
    _id: String
    document: String
    first_name: String
    last_name: String
    email: String
    password: String
    departmentId: String
    roleId: String
    isLeader: String
`;

const ARQ_UserSchema = [`
    type ARQ_User {
        ${UserField}
        createdAt: String 
        updatedAt: String
        isRemove: Boolean 
    }

    input ARQ_User_input {
        ${UserField}
    }

    input ARQ_User_filter {
        ${UserField}
    }

    type Query {
        ARQ_User(filter: ARQ_User_filter): [ARQ_User]
        ARQ_User_count(filter: ARQ_User_filter): Int
    }

    type Mutation {
        ARQ_User_update(input: ARQ_User_input):ID
        ARQ_User_delete(_id: String!): Boolean
    }
`]

module.exports = ARQ_UserSchema
