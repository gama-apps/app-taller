const { session: Session} = require('../models/session/Session');
const { User } = require('../models/session/User');
const { session: Role } = require('../models/session/Role');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const register = async (_, { input = {} }) => {
  try {
    const ID = uuidv4();
    const {
      document,
      first_name,
      last_name,
      email,
      password,
      departmentId,
      roleId,
      isLeader,
    } = input;

    const hash = bcrypt.hashSync(password, 10);

    const newUser = new User({ // Create an instance of User
      _id: ID,
      document,
      first_name,
      last_name,
      email,
      password: hash,
      departmentId,
      roleId,
      isLeader,
    });

    await newUser.save(); // Call the save method on the instance

    return newUser._id;
  } catch (error) {
    return error;
  }
}

const login = async (_, { email, password }) => {
  try {
    const loginUser = await User.findOne({ email, password });
    
    if (!loginUser){
      throw new Error ('No se encontro el usuario')
    }
    
    const validatePassword = await bcrypt.compare(password, loginUser.password);

    if(!validatePassword){
      throw new Error('Contraseña incorrecta')
    }

    const role = await Role.findById(loginUser.roleId);

    if(!role){
      throw new Error('Role no encontrado')
    }

    //pendiente de realizar la funcionalidad para expiredAt

    const session = await new Session({
      _id: uuidv4(),
      token: uuidv4(),
      role: role.name,
      userId: loginUser._id,
      userName: `${loginUser.first_name} + ${loginUser.last_name}`,
      expiredAt: new Date(24 * 3600 * 1000)
    }).save();

    return session;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Mutation: {
    register,
    login
  }
}