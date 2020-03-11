var express = require('express');
var router = express.Router();
var { Employee, User } = require('../models');

router.get('/:employeeId?', (req, res) => {
  const { employeeId } = req.params;

  let query;
  if (employeeId) {
    query = Employee.findOne({
      where: { id: Number(employeeId) },
      include: User
    });
  } else {
    query = Employee.findAll({
      include: User
    });
  }
  return query.then(employees => res.json(employees));
})

router.put('/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  const { userId } = req.body;

  let query = Employee.update({
    userId: userId
  }, {
      where: {
        id: employeeId
      }
    });

  return query.then(employees => res.json(employees));
})

router.post('/', (req, res) => {
  const { userId } = req.body;

  let query = Employee.create({
    userId: userId
  });

  return query.then(employees => res.json(employees));
})

router.delete('/:employeeId', (req, res) => {
  const { employeeId } = req.params;

  let query = Employee.destroy({
    where: {
      id: employeeId
    }
  });

  return query.then(employees => res.json(employees));
})

module.exports = router;
