const Department = require('../models/Department');
const { handlePagination } = require("@codecraftkit/utils");
const { v4: uuidv4 } = require('uuid');

const ARQ_Department = async (_, { filter = {}, options = {}, count = false }) => {
  try {
    const { sort = { createdAt: -1 }, skip, limit } = handlePagination(options)
    let query = { isRemove: false };
    const { _id, key, name, users } = filter;

    if (_id) query._id = _id;
    if (key) query.key = { $regex: key, $options: "i" };
    if (name) query.name = { $regex: name, $options: "i" };
    if (users) query.users = users;
    
    if (count) return await Department.countDocuments(query);
    
    const collection = [
      { $match: query },
      { $sort: sort },
      {
       $lookup: {
         from: 'Inventory',
         localField: '_id',
         foreignField: 'departmentId',
         as: 'invDepartment'
       }
      },
      {
        $unwind: {
          path: '$invDepartment',
          preserveNullAndEmptyArrays: true
        }
      }
   ]


   if (skip) collection.push({ $skip: skip })
   if (limit) collection.push({ $limit: limit })

   return await Department.aggregate(collection)
  } catch (error) {
    return error;
  }
};

const ARQ_Department_count = async (_, { filter = {} }) => {
  try {
    return await ARQ_Department(_, { filter, count: true });
  } catch (error) {
    return error;
  }
};

const ARQ_Department_create = async (_, { input = {} }) => {
  try {
    const ID = uuidv4();
    const { name, users = [] } = input;

    const namePrefix = name.trim().slice(0, 3).toUpperCase();
    
    const key = `ARQ-${namePrefix}`

    const newDepartment = await new Department({
      _id: ID,
      key,
      name,
      users,
    }).save();

    return newDepartment._id;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('La key de departamento ya existe. Por favor, elija otro nombre para el departamento.');
    } else {
      throw error;
    }
  }
};

const ARQ_Department_update = async (_, { input }) => {
  try {
    const { _id, key, name, users } = input;

    await Department.updateOne(
      { _id },
      {
        $set: {
          key,
          name,
          users,
          updatedAt: new Date(),
        },
      }
    );

    return _id;
  } catch (error) {
    return error;
  }
};

const ARQ_Department_save = async (_, { input }) => {
  try {
    const actions = {
      create: ARQ_Department_create,
      update: ARQ_Department_update,
    };

    const action = input._id ? "update" : "create";
    return actions[action](_, { input });
  } catch (error) {
    return error;
  }
};

const ARQ_Department_delete = async (_, { _id }) => {
  try {
    const department = await Department.findOne({ _id, isRemove: false, }).lean();

    await department.updateOne({ _id }, { $set: { isRemove: true } });
  } catch (error) {
    return error;
  }
};

module.exports = {
  Query: {
    ARQ_Department,
    ARQ_Department_count,
  },
  Mutation: {
    ARQ_Department_save,
    ARQ_Department_delete,
  },
};