var express = require('express');
var router = express.Router();

var { EmployeeProcess,Process,Employee } = require('../models');

router.get('/:processId', (req, res) => {
  const { processId } = req.params;

  let query;
  query = EmployeeProcess.findAll({
    where: { ProcessId: processId }
  });

  return query.then(data => res.json(data));
})

router.post('/', (req, res) => {
  const { ProcessId, EmployeeId } = req.body;

  let query = EmployeeProcess.create({
    ProcessId: ProcessId,
    EmployeeId: EmployeeId
  });

  return query.then(data => res.json(data));
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  let query = EmployeeProcess.destroy({
    where: {
      Id: id
    }
  });

  return query.then(data => res.json(data));
})

module.exports = router;
