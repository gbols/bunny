import models from '../models';

export const createTask = async (req, res) => {
  const { description, title } = req.body;
  const { id } = req.user;
  const task = await models.Task.create({ userId: id ,description, title});

  return res.status(201).send({
    success: true,
    message: 'Task successfully created',
    task
  })
}

export const updateTask = async (req, res) => {
  const { id } = req.params;

  const task = await models.Task.findOne({ where: { id , userId: req.user.id} });
  if (!task) {
    return  res.status(404).send({
      success: false,
      message: 'task not found'
    })
  }
  const newTask = await task.update({
    description: req.body.description || task.description,
    title: req.body.title || task.title,
    complete: req.body.complete || task.complete,
  });

  return res.status(200).send({
    success: true,
    message: 'task successfully updated',
    task: newTask
  });
};


export const getTasksByUser = async (req, res) => {
  const { id } = req.params;

  const tasks = await models.Task.findAll({ where: { userId: id} });

  return res.status(200).send({
    success: true,
    message: 'tasks successfully returned',
    tasks
  });
};


export const getAllTasks = async (req, res) => {
  const tasks = await models.Task.findAll({ include: 
    [{
    model: models.User,
    as: 'author',
    attributes: ['email', 'firstname', 'lastname']
  }]
});

  return res.status(200).send({
    success: true,
    message: 'All tasks successfully returned',
    tasks
  });
}

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const task = await models.Task.findOne({ where: { id, userId}});
  if (!task) {
    return  res.status(404).send({
      success: false,
      message: 'task not found'
    })
  }

  await task.destroy();

  return res.status(200).send({
    success: true,
    message: 'task successfully deleted',
    task
  })
}
