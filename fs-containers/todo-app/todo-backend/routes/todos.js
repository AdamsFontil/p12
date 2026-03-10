const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redisCache = require('../redis/index')


const initTodosCounter = async () => await redisCache.jsonSet('todos_added2', '$', {'added_todos': 2})
initTodosCounter()

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const keyExists = await redisCache.jsonGet('todos_added2')
  if (keyExists) {
    console.log('no need to create key')
    console.log('B4 incr todos_added2', keyExists)
    await redisCache.jsonIncr('todos_added2', '$.added_todos', 1)
  } else {
    console.log('MUST create key')
    console.log('B4 CREATING todos_added2', await redisCache.jsonGet('todos_added2'))
    await await redisCache.jsonSet('todos_added2', '$', {'added_todos': 1})
  }

  console.log('AFTER incr todos_added2', await redisCache.jsonGet('todos_added2'))
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  console.log('id--midware', id)
  console.log('midware')
  // console.log('req from middleware', req)
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  // console.log('what is req', req.todo)
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body
  console.log(`here is text-${text}, and done-${done}`)
  req.todo.text = text
  req.todo.done = done
  await req.todo.save()
  console.log('Newtodo??', req.todo)
  res.send(req.todo)
});




router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
