var express = require('express');
var router = express.Router();
var { Process, Task, Employee} = require('../models');

router.get('/:processId?', (req, res) => {
  const { processId } = req.params;

  let query;
  if (processId) {
    query = Process.findOne({
      where: { id: Number(processId) },
      include: 'Tasks'
    });
  } else {
    query = Process.findAll({
      include: [
        {
          model: Task,
          as: 'Tasks',
          required: false,
          attributes: ['Id', 'Name', 'Description']
        },
        {
          model: Employee,
          as: 'Manager',
          required: false,
          attributes: ['Id'],
        }]
    });
  }
  return query.then(processs => res.json(processs));
})

router.put('/:processId', (req, res) => {
  const { processId } = req.params;
  const { Name, Description, ManagerId } = req.body;

  let query = Process.update({
    Name: Name,
    Description: Description,
    ManagerId: ManagerId
  }, {
      where: {
        Id: processId
      }
    });

  return query.then(processs => res.json(processs));
})

router.post('/', (req, res) => {
  const { Name, Description, ManagerId } = req.body;

  let query = Process.create({
    Name: Name,
    Description: Description,
    ManagerId: ManagerId
  });

  return query.then(processs => res.json(processs));
})

router.delete('/:processId', (req, res) => {
  const { processId } = req.params;

  let query = Process.destroy({
    where: {
      Id: processId
    }
  });

  return query.then(processs => res.json(processs));
})

module.exports = router;
