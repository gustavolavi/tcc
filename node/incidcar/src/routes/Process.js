var express = require('express');
var router = express.Router();
var { Process } = require('../models');

router.get('/:processId?', (req, res) => {
  const { processId } = req.params;

  let query;
  if (processId) {
    query = Process.findOne({
      where: { id: Number(processId) }
    });
  } else {
    query = Process.findAll();
  }
  return query.then(processs => res.json(processs));
})

router.put('/:processId', (req, res) => {
  const { processId } = req.params;
  const { name, description, managerId } = req.body;

  let query = Process.update({
    name: name,
    description: description,
    managerId: managerId
  }, {
      where: {
        id: processId
      }
    });

  return query.then(processs => res.json(processs));
})

router.post('/', (req, res) => {
  const { name, description, managerId } = req.body;

  let query = Process.create({
    name: name,
    description: description,
    managerId: managerId
  });

  return query.then(processs => res.json(processs));
})

router.delete('/:processId', (req, res) => {
  const { processId } = req.params;

  let query = Process.destroy({
    where: {
      id: processId
    }
  });

  return query.then(processs => res.json(processs));
})

module.exports = router;
