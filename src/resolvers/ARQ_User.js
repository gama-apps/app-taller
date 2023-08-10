const { User } = require("../models/session/User");
const { handlePagination } = require("@codecraftkit/utils");
const { v4: uuidv4 } = require("uuid");

const ARQ_User = async (_, { filter = {}, options = {}, count = false }) => {
  try {
    const query = { isRemove: true };
    const { skip, limit } = handlePagination(options);
    let {
      _id,
      id,
      first_name,
      last_name,
      email,
      password,
      departmentId,
      roleId,
      isLeader,
    } = filter;

    if (_id) query._id = _id
    if (id) query.id = id
    if (first_name) query.first_name = first_name
    if (last_name) query.last_name = last_name 
    if (email) query.email = email
    if (password) query.password = password
    if (departmentId) query.departmentId = departmentId
    if (roleId) query.roleId = roleId
    if (isLeader) query.isLeader = isLeader
    
    if (count) return await User.countDocuments(query)
    
    const find = User.find(query)

    if (skip) { find.skip(skip) }
    if (limit) { find.limit(limit) }

    return await find.lean()
  } catch (error) {
    return error;
  }
};

module.exports = {
    Query: {
        ARQ_User
    }
}
