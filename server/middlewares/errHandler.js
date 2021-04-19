// const { response } = require("express");

function errHandler (err, req, res, next){
    if (err.code === 400) {
        let errors = []
        if (Array.isArray(err.message)) {
            err.message.forEach(error => {
                errors.push({message : error.message})
            });

            res.status(400).json({error : errors})    
        } else {
            res.status(400).json(err)
        }
    } else if (err.code === 401){
        res.status(401).json({message : err.message})
    } else if (err.code === 404){
        res.status(404).json({message : err.message})
    } else{
        res.status(500).json({message : err.message})
    }
}


module.exports = errHandler