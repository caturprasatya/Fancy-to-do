const router = require('express').Router()
const {authenticate} = require('../middlewares/auth')
const routerTodo = require('./todos')
const UserController = require('../controllers/userController')
const ApiController = require('../controllers/apiController')


router.post('/register', UserController.createNewUser)

router.post('/login', UserController.login)

router.post('/googleLogin', ApiController.googleLogin)

router.use(authenticate)
//* after login

router.use('/todos', routerTodo)//*show all


module.exports = router