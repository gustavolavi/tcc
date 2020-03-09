var express = require('express');
var router = express.Router();
var { User } = require('../models');

router.get('/:userId?', (req, res) => {
  const { userId } = req.params;
  
  let query;
  if(userId) {
      query = User.findOne({
        where: { id: Number(userId) }
      });
  } else {
      query = User.findAll();
  }
  return query.then(users => res.json(users))
})

module.exports = router;
