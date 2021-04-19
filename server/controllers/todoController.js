const { Todo, User } = require('../models')
class TodoController{
    static showAll(req, res, next){
        let { id } = req.currentUser
        
        User
            .findByPk(id, {include : Todo})
            .then(data =>{
                res.status(200).json(data.Todos)
            })
            .catch(err =>{
                next({
                    code: 500,
                    message:"Internal Server Error"
                })
            })
    }

    static newTodo(req, res, next){
        let { title, description, status, due_date} = req.body
        let userId = req.currentUser.id
        let newTodo = {title, description, status, due_date, userId}
        
        Todo
            .create(newTodo)
            .then(todo =>{
                res.status(201).json(todo)
            })
            .catch(err =>{
                if (Array.isArray(err.errors)) {
                    next({ code : 400, message : err.errors})
                } else {
                    next({code : 500, message: "Internal Server Error"})
                }
            })
    }

    static findTodo(req, res, next){
        let {id} = req.params
        Todo
            .findByPk(id)
            .then(todo =>{
                res.status(200).json(todo)
            })
            .catch(err =>{
                next({code:500, message: "Internal Server Error"})
            })
    }

    static editTodo(req, res, next){
        let { id } = req.params
        let { title, description, status, due_date } = req.body 
        let editTodo = {title, description, due_date}

        Todo
            .update(editTodo, {where : { id }, returning : true})
            .then(todo =>{
                res.status(200).json(todo)
            })
            .catch(err =>{
                if (Array.isArray(err.errors)) {
                    next({ code : 400, message : err.errors})
                } else {
                    next({code : 500, message: "Internal Server Error"})
                }
            })
    }

    static editSubTodo(req,res, next){
        let { id } = req.params
        let chgStatus = req.body.status

        let patch
        if (chgStatus === 'false') {
            patch = { status : false }  
        } else {
            patch = { status : true }
        } 

        Todo
            .update(patch, {where : { id }})
            .then(todo =>{
                res.status(200).json({todo, msg:'Success edit todo'})
            })    
            .catch(err =>{
                next({code:500, message:"Internal Server Error"})
            })
    }

    static deleteTodo(req, res) {
        let {id} = req.params

        Todo
            .destroy({where: { id }})
            .then(todo => {
                res.status(200).json({msg : "Todo successfully deleted"})
            })
            .catch(err => { 
                next({code : 500, message: "Internal Server Error"})
            })
    }

    static test(req, res){
        res.send('GOOD')
    }
}

module.exports = TodoController