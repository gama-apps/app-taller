const Role = require('../models/session/Role');
const { handlePagination } = require("@codecraftkit/utils");
const { v4: uuidv4 } = require('uuid');

const ARQ_Role = async (_, {filter = {}, options = {}, count = {}}) => {
  try {
    const query = { isRemove: false };
    const { skip, limit } = handlePagination(options);
    let { _id, name } = filter

    if (_id) query._id = _id;
    if (name) query.name = name;

    const find = Role.find(query)

    if (count) return await Books.countDocuments(query);

    if (skip) {
      find.skip(skip);
    }
    if (limit) {
      find.limit(limit);
    }

    return await find.lean()
  } catch (error) {
    return error;
  }
}

const ARQ_Role_count = async (_, { filter = {} }) => {
  try {
    return await ARQ_Role(_, { filter, count: true })
  } catch (error) {
    return error;
  }
}

const ARQ_Role_create = async (_, { input = {}}) => {
  try {
    const ID = uuidv4()
    const {name} = input

    const newRole = await new Role({
      _id: ID,
      name
    }).save();

    return newRole._id
  } catch (error) {
    return error;
  }
}

const ARQ_Role_update = async (_, { input }) => {
  try {
    const { _id, name } = input;

    await input.updateOne(
      {_id},
      {$set: {name}}
    )

    return _id;
  } catch (error) {
    return error;
  }
}

const ARQ_Role_save = async (_, { input }) => {
  try {
    const actions = {
      create: ARQ_Role_create,
      update: ARQ_Role_update
    }

    const action = input._id ? 'update' : 'create';
    return actions[action](_, { input });
  } catch (error) {
    return error;
  }
}

const ARQ_Role_delete = async (_, { _id }) => {
  try {
    const role = await Role.findOne({ _id, isRemove: fale }).lean()

    await Role.updateOne({ _id, }, { $set: { isRemove } });
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    ARQ_Role,
    ARQ_Role_count
  },
  Mutation: {
    ARQ_Role_save,
    ARQ_Role_delete
  }
}