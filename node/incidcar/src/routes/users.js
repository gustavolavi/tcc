var express = require('express');
var router = express.Router();
var { User } = require('../models');

router.get('/:userId?', (req, res) => {
  const { userId } = req.params;

  let query;
  if (userId) {
    query = User.findOne({
      where: { id: Number(userId) }
    });
  } else {
    query = User.findAll();
  }
  return query.then(users => res.json(users));
})

router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  let query = User.update({
    name: name,
    email: email,
    password: password
  }, {
      where: {
        id: userId
      }
    });

  return query.then(users => res.json(users));
})

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  let query = User.create({
    name: name,
    email: email,
    password: password
  });

  return query.then(users => res.json(users));
})

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  let query = User.destroy({
    where: {
      id: userId
    }
  });

  return query.then(users => res.json(users));
})

module.exports = router;
