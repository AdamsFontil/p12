const express = require('express');
const router = express.Router();
const redisCache = require('../redis/index')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const stats = await redisCache.jsonGet('todos_added2')
  console.log('what are stats...', stats);
  res.json(stats)
})



module.exports = router;
