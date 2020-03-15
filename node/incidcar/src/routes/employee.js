var express = require('express');
var router = express.Router();
var { Employee, User } = require('../models');

router.get('/:EmployeeId?', (req, res) => {
  const { EmployeeId } = req.params;

  let query;
  if (EmployeeId) {
    query = Employee.findOne({
      where: { Id: Number(EmployeeId) },
      include: User
    });
  } else {
    query = Employee.findAll({
      include: User
    });
  }
  return query.then(employees => res.json(employees));
})

router.put('/:EmployeeId', (req, res) => {
  const { EmployeeId } = req.params;
  const { UserId } = req.body;

  let query = Employee.update({
    UserId: UserId
  }, {
      where: {
        Id:  Number(EmployeeId)
      }
    });

  return query.then(employees => res.json(employees));
})

router.post('/', (req, res) => {
  const { UserId } = req.body;

  let query = Employee.create({
    UserId: UserId
  });

  return query.then(employees => res.json(employees));
})

router.delete('/:EmployeeId', (req, res) => {
  const { EmployeeId } = req.params;

  let query = Employee.destroy({
    where: {
      Id: EmployeeId
    }
  });

  return query.then(employees => res.json(employees));
})

module.exports = router;
