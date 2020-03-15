var express = require('express');
var router = express.Router();
var { Incident, User } = require('../models');

router.get('/:incidentId?', (req, res) => {
  const { incidentId } = req.params;

  let query;
  if (incidentId) {
    query = Incident.findOne({
      where: { Id: Number(incidentId) },
      include: User
    });
  } else {
    query = Incident.findAll({
      include: User
    });
  }
  return query.then(data => res.json(data));
})

router.put('/:incidentId', (req, res) => {
  const { incidentId } = req.params;
  const {  title,description,userId} = req.body;

  let query = Incident.update({
    Title: title,
    Description: description,
    UserId: userId
  }, {
      where: {
        Id: incidentId
      }
    });

  return query.then(data => res.json(data));
})

router.post('/', (req, res) => {
  const { title,description,userId,employeeId} = req.body;

  let query = Incident.create({
    Title: title,
    Description: description,
    UserId: userId,
    EmployeeId: employeeId
  });

  return query.then(data => res.json(data));
})

router.delete('/:incidentId', (req, res) => {
  const { incidentId } = req.params;

  let query = Incident.destroy({
    where: {
      Id: incidentId
    }
  });

  return query.then(data => res.json(data));
})

module.exports = router;
