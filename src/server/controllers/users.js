import models from '../models';
import { getHash, getToken, comparePassword } from '../../utils/helpers';

export const signup = async (req, res) => {
  const { email, password, firstname, lastname, role } = req.body;
  const hash = getHash(password);
  const theRole = role ? role : 'standard';
  const newUser = await models.User.create({
    email, firstname, lastname, password: hash, role: theRole
  });

  newUser.password = null;
  const token = getToken({
    email: newUser.email,
    firstname: newUser.firstname,
    lastname:newUser.lastname,
    id: newUser.id,
    role: newUser.role
  });

  return res.status(201).send({
    success: true,
    message: 'user successfully created.',
    token
  })
}

export const login = async (req, res) => {
  const  { email, password }  = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (!user) {
    return res.status(403).send({
      success: false,
      message: 'Invalid email or password'
    })
  }

  const correctPassword = comparePassword(password, user.password);
  if (!correctPassword) {
   return res.status(403).send({
     success: false,
     message: 'Invalid email or password'
   })
  }

  const token = getToken({
   firstname: user.firstname,
   lastname: user.lastname,
   email: user.email,
   id: user.id,
   role: user.role
 });

 res.status(200).json({
   success: true,
   message: 'User successfully logged in',
   token
 });
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({
    where: { id },
    attributes: {
      exclude: ['password']
    },
    include: [{
      model: models.Task,
      as: 'tasks'
    }]
  }); 
  if(!user) {
   return  res.status(404).send({
      success: false,
      message: 'user not found'
    })
  }
  return res.status(200).send({
    success: true,
    message: 'user succesfully retrieved',
    user
  })
};

export const getAllUsers = async (req, res) => {
  const users = await models.User.findAll({
    attributes: {
      exclude: ['password']
  }
});
  return res.status(200).send({
    success: true,
    message: "users successfully retrieved",
    users
  })
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findByPk(id); 
  if(!user) {
   return  res.status(404).send({
      success: false,
      message: 'user not found'
    })
  }

  const newUser = await user.update({
    lastname: req.body.lastname || user.lastname,
    firstname: req.body.firstname || user.firstname,
    email: req.body.email || user.email,
    password: req.body.password ? getHash(req.body.password) : user.password
  });

  return res.status(200).send({
    success: true,
    message: 'user details succesfully updated',
    user: newUser
  });
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { role }  = req.user
  console.log(role);
  if(role !== 'admin') {
    return  res.status(401).send({
      success: false,
      message: 'unauthorized to perform this action'
    })
  }
  const user = await models.User.findByPk(id); 
  if(!user) {
   return  res.status(404).send({
      success: false,
      message: 'user not found'
    })
  }

   await user.destroy();
   return res.status(200).send({
    success: true,
    message: 'user successfully deleted',
    user
  })
}