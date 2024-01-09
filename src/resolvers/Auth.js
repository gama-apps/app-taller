const  Session = require('../models/session/Session');
const   User  = require('../models/session/User');
const  Role  = require('../models/session/Role');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const {shield, rule, and, or} =require('graphql-shield');
const { argsToArgsConfig } = require('graphql/type/definition');

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
    
    //saltRound = 10, encriptacion del password
    const hash = bcrypt.hashSync(password, 10);
    
    //verifica si el email ya esta registrado
    const verifyEmail = await User.findOne({ email: input.email })
    
    if(!verifyEmail){
        throw new Error('El email ya se encuentra registrado')
      }
      
      const newUser = {
        _id: ID,
        document,
        first_name,
        last_name,
        email,
        password: hash,
        departmentId,
        roleId,
        isLeader
      }

      await User(newUser).save();
      
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
    
    const validatePassword = await bcrypt.compare(password, loginUser.password);

    if(!validatePassword){
      throw new Error('Contraseña incorrecta')
    }

    const role = await Role.findById(loginUser.roleId);
    
    const isAdmin = rule()(async (parent,args, ctx, info) => {
      return ctx.user.role === 'admin'
    })

    if(!role){
      throw new Error('Role no encontrado')
    }

    //pendiente de realizar la funcionalidad para expiredAt
    //hola desde linux

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

//hacer las valiidaciones de graphql shield
//asignar las reglas segun el rol
//practicar que lo tengo muy tirado

