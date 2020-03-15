var express = require('express');
var router = express.Router();

var { User } = require('../models');

router.get('/:userId?', (req, res) => {
  const { userId } = req.params;

  let query;
  if (userId) {
    query = User.findOne({
      where: { Id: Number(userId) }
    });
  } else {
    query = User.findAll();
  }
  return query.then(users => res.json(users));
})

router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  const { Name, Email, Password } = req.body;

  let query = User.update({
    Name: Name,
    Email: Email,
    Password: Password
  }, {
      where: {
        Id: userId
      }
    });

  return query.then(users => res.json(users));
})

router.post('/', (req, res) => {
  const { Name, Email, Password } = req.body;

  let query = User.create({
    Name: Name,
    Email: Email,
    Password: Password
  });

  return query.then(users => res.json(users));
})

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  let query = User.destroy({
    where: {
      Id: userId
    }
  });

  return query.then(users => res.json(users));
})

module.exports = router;
