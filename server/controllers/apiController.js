const axios = require("axios").default
const {OAuth2Client} = require('google-auth-library')
const {User} = require('../models')
const {generateToken} = require('../helpers/generate')

class ApiController{

    static weather(req, res, next){
        let country = req.body.country || 'jakarta'
        
        axios({
            url: `https://api.openweathermap.org/data/2.5/weather?q=JAKARTA&units=metric&appid=${process.env.API_WEATHER}`,
            method: 'GET'
            // https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(err =>{
            console.log(err);
            next(err)
        })
    }

    static googleLogin(req, res, next){
      const client = new OAuth2Client(process.env.CLIENT_ID);
      let email
      let password
      let fullname

      client
          .verifyIdToken({
              idToken: req.body.googleToken,
              audience: process.env.CLIENT_ID,
          })
          .then(ticket =>{
              const payload = ticket.getPayload();

              email = payload.email
              fullname = payload.name
              password = new Date().toString()

              return User.findOne({ where : { email }})
          })
          .then(user =>{
              if (user) {

                  const access_token = generateToken({ id: user.id, email: user.email })
                  
                  res.status(200).json({ access_token, userId:user.id, name:user.fullname })                
              } else {
                  return User.create({
                      email,
                      fullname,
                      password
                  })
              }
          })
          .then(generateUser =>{
              const access_token = generateToken({ id: generateUser.id , email:generateUser.email })
              res.status(201).json({ access_token, userId:generateUser.id, name: generateUser.fullname })
          })
          .catch(err =>{
              next({code : 401, message : err})
          })
  }
}

module.exports = ApiController