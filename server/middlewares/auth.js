const {User, Todo} = require('../models')
const {verifyLogin} = require('../helpers/verify')

const authenticate = (req, res, next) =>{
    try {
        let access_token = req.headers.access_token
        let decoded = verifyLogin(access_token);
        
        if (decoded) {
            User
                .findByPk(decoded.id)
                .then(data =>{
                    req.currentUser = {id:decoded.id, email:decoded.email}
                    next()
                })
                .catch(err =>{
                    next({
                        code : 401,
                        message : "Invalid User"})
                })
        } else {
            next({
                code : 401,
                message : "Invalid User"})
        }        
    } catch (err) {
        console.log(err);
        next({
            code:401,
            message : "Invalid Token"
        })
    }
}

const authorize = (req, res, next) =>{
    let {id} = req.params
    let userId = req.currentUser.id
    
    Todo
        .findByPk(id)
        .then(data =>{
            if (data.userId === userId) {
                next()                
            } else {
                next({
                    code : 404,
                    message : "Todo Not Found"})
            }
        })
        .catch(err =>{
            next({
                code: 500,
                message:"Internal Server Error"
            })
        })
}




module.exports = {authenticate, authorize}