const { session: Session} = require('../models/session/Session');
const { session: User } = require('../models/session/User');
const { session: Role } = require('../models/session/Role');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const register = async (_, { input = {} }) => {
  try {
    //verifica si el email ya esta registrado
    const verifyEmail = await User.findOne({ email: input.email })

    if(!verifyEmail){
      throw new Error('El email ya se encuentra registrado')
    }

    const ID = uuidv4();
    const {
      id,
      first_name,
      last_name,
      email,
      password,
      departmentId,
      roleId,
      isLeader,
    } = input;

    //saltRound = 10
    const hash = bcrypt.hashSync(password, 10);

    const newUser = await new User({
      _id: ID,
      id,
      first_name,
      last_name,
      email,
      password: hash,
      departmentId,
      roleId,
      isLeader
    }).save();

    return newUser._id;
  } catch (error) {
    return error
  }
}

const login = async (_, { email, password }) => {
  try {
    const loginUser = await User.findOne({ email, password });
    
    if (!loginUser){
      throw new Error ('No se encontro el usuario')
    }
    
    const validatePassword = await bcrypt.compare(password, loginUser.passworHash);

    if(!validatePassword){
      throw new Error('Contraseña incorrecta')
    }

    const role = await Role.findById(loginUser.roleId);

    if(!role){
      throw new Error('Contraseña incorrecta')
    }

    //pendiente de realizar la funcionalidad para expiredAt
    
    const session = await new Session({
      _id: uuidv4(),
      token: uuidv4(),
      role: role.name,
      userId: loginUser._id,
      userName: `${loginUser.first_name} + ${loginUser.last_name}`,
      expiredAt 
    }).save();

    return session;
  } catch (error) {
    return error;
  }
}