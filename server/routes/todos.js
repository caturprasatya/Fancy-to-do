const router = require('express').Router()
const {authorize} = require('../middlewares/auth')
const TodoController = require('../controllers/todoController')

router.get('/', TodoController.showAll)//*show all

router.post('/', TodoController.newTodo)//* add new todo

router.use('/:id', authorize)

router.get('/:id', TodoController.findTodo)//* find one todo

router.put('/:id', TodoController.editTodo)//*edit all entitas

router.patch('/:id', TodoController.editSubTodo)

router.delete('/:id', TodoController.deleteTodo)

module.exports = router