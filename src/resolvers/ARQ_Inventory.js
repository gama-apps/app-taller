const Inventory = require('../models/Inventory');
const { handlePagination } = require('@codecraftkit/utils');
const { v4: uuidv4 } = require('uuid');

const ARQ_Inventory = async (_, { filter = {}, options = {}, count = false }) => {
  try {
    let query = { isRemove: false };
    const { skip, limit } = handlePagination(options);
    let { _id, key, name, quantity, isAvailable, departmentId } = filter;

    if (_id) query._id = _id;
    if (key) query.key = key;
    if (name) query.name = name;
    if (quantity) query.quantity = quantity;
    if (typeof isAvailable === "boolean") query.isAvailable = isAvailable;
    if (departmentId) query.departmentId = departmentId;

    if (count) return await Inventory.countDocuments(query);

    //const find = Inventory.find(query)

    const collection = [{ $match: query }, { $sort: sort },
       {
        $lookup: {
          from: 'department',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'departmentId'
        }
       } 
    ]

    // if (skip) { find.skip(skip) }
    // if (limit) { find.limit(limit) }

    if (skip) collection.push({ $skip: skip })
    if (limit) collection.push({ $limit: limit })

    return await Inventory.aggregate(collection)
  } catch (error) {
    return error;
  }
};

const ARQ_Inventory_count = async (_, { filter = {} }) => {
  try {
    return await ARQ_Inventory(_, { filter, count: true });
  } catch (error) {
    return error;
  }
}

const ARQ_Inventory_create = async (_, { inventoryInput = {} }) => {
  try {
    const ID = uuidv4();
    const { name, quantity, isAvailable, departmentId } = inventoryInput;

    const key = name.trim().toLowerCase().replaceAll(" ", "_");

    const newInventory = await new Inventory({
      _id: ID,
      key,
      name,
      quantity,
      isAvailable,
      departmentId,
      createdAt: new Date().getTime(),
      //extraDateInfo: getDateDetails(new Date()),
    }).save();

    return newInventory._id
  } catch (error) {
    return error;
  }
}

const ARQ_Inventory_update = async (_, { inventoryInput }) => {
  try {
    const { _id,
            key,
            name,
            quantity,
            isAvailable,
            departmentId
           } = inventoryInput;

    await Inventory.updateOne(
      { _id },
      {
        $set: {
          key,
          name,
          quantity,
          isAvailable,
          departmentId,
          updatedAt: new Date(),
        },
      }
    );

    return _id;
  } catch (error) {
    return error;
  }
}

const ARQ_Inventory_save = async (_, { inventoryInput }) => {
  try {
    if (typeof inventoryInput.quantity === 'number') {
      inventoryInput.isAvailable = inventoryInput.quantity >= 1;
    } else {
      throw new Error('Quantity must be a number.');
    }

    const actions = {
      create: ARQ_Inventory_create ,
      update: ARQ_Inventory_update
    };

    const action = inventoryInput._id ? 'update' : 'create';
    return actions[action](_, { inventoryInput });
  } catch (error) {
    return error;
  }
}

const ARQ_Inventory_delete = async (_, { _id }) => {
  try {
    const inventory = await Inventory.findOne({ _id, isRemove: false }).lean();
    if (!inventory) throw new Error('NO_EXISTE_EL_PRODUCTO EN INVENTARIO');

    await Inventory.updateOne({ _id }, { $set: { isRemove: true } });

    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
     ARQ_Inventory,
     ARQ_Inventory_count
  },
  Mutation: {
    ARQ_Inventory_save,
    ARQ_Inventory_delete
  }
}

