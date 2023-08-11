const { session: Session} = require('..models/session')
const { session: User } = require('..models/session')
const { v4: uuidv4 } = require('uuid');


const login = async (_, { email, password }) => {
  try {
    const loginUser = await User.findOne({ email, password });
    
    const session = new Session({
      _id: uuidv4(),
      token: uuidv4(),
      role,
      userId: loginUser._id,
      userName: loginUser.name,
      expiredAt 
    }).save()
    return
  } catch (error) {
    return error;
  }
}