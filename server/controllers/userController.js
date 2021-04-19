const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/generate')

class UserController {

    static createNewUser(req, res, next){
        const { email, password, fullname } = req.body
        let newUser = {email, password, fullname}

        User
            .create(newUser)
            .then(user =>{

                res.status(201).json({msg : "succesfully added new user"})
            })
            .catch(err =>{
              if (Array.isArray(err.errors)) {
                next({ code : 400, message : err.errors})
              } else {
                next({code : 500, message: "Internal Server Error"})
            }
            })
    }

    static login(req, res, next){
        let { email, password } = req.body
        
        User
            .findOne({where: { email }})
            .then(user => {
              console.log(user);
              if (user) {
                    const comparePass = comparePassword(password, user.password)
                    
                    if (comparePass) {
                        let access_token = generateToken({ id:user.id, email:user.email })
                        res.status(200).json({access_token, userId:user.id, name:user.fullname})
                    } else {
                      next({
                        code: 401,
                        message : "Invalid email / password"})  
                    }
                } else {
                    next({
                        code: 401,
                        message : "Invalid email / password"})
                }
            })
            .catch(err =>{
                console.log(err);
                next({
                    code : 500,
                    message : "Internal Server Error"})
            })

    }
}


module.exports = UserController