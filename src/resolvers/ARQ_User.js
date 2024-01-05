const { User } = require("../models/session/User");
const { handlePagination } = require("@codecraftkit/utils");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");

const ARQ_User = async (_, { filter = {}, options = {}, count = false }) => {
  try {
    const query = { isRemove: false };
    const { skip, limit } = handlePagination(options);
    let {
      _id,
      document,
      first_name,
      last_name,
      email,
      password,
      departmentId,
      roleId,
      isLeader,
    } = filter;

    if (_id) query._id = _id
    if (document) query.id = document
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
}

const ARQ_User_count = async (_, { filter = {} }) => {
  try {
    return await ARQ_User(_, { filter, count: true });
  } catch (error) {
    return error;
  }
}

// const ARQ_User_create = async (_, { input = {} }) => {
//   try {
//     const ID = uuidv4();
//     const {
//       id,
//       first_name,
//       last_name,
//       email,
//       password,
//       departmentId,
//       roleId,
//       isLeader,
//     } = input;

//     const newUser = await new User({
//       _id: ID,
//       id,
//       first_name,
//       last_name,
//       email,
//       password,
//       departmentId,
//       roleId,
//       isLeader
//     }).save();

//     return newUser._id;
//   } catch (error) {
//     return error
//   }
// }

const ARQ_User_update = async (_, { input }) => {
  try {
    const {
      _id,
      document,
      first_name,
      last_name,
      email,
      password,
      departmentId,
      roleId,
      isLeader,
    } = input;

    if(password){
      const encryptedPassword = await bcrypt.hash(password, 10);
      password = encryptedPassword 
    }

    await User.updateOne({_id}, 
      {$set: {
        document,
        first_name,
        last_name,
        email,
        password,
        departmentId,
        roleId,
        isLeader
      }})

      return _id
  } catch (error) {
    return error
  }
}

const ARQ_User_delete = async (_, { _id }) => {
  try {
    await User.findByIdAndUpdate(_id, { $set: { isRemove: true } })

    return true
  } catch (error) {
    return error
  }
} 


module.exports = {
    Query: {
        ARQ_User,
        ARQ_User_count 
    },
    Mutation: {
      ARQ_User_update,
      ARQ_User_delete
    }
}

//