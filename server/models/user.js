'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey : "userId"})
    }
  };
  User.init({
    email: {
        type : DataTypes.STRING,
        unique : true,
        validate:{
            notEmpty:{
                args:true,
                msg:"Email cannot empty"
            }
        }
    },
    fullname: {
        type : DataTypes.STRING,
        validate:{
            notEmpty:{
                args:true,
                msg:"Fullname cannot empty"
            }
        }
    },
    password: {
        type : DataTypes.STRING,
        validate:{
            notEmpty:{
                args: true,
                msg:"Password cannot empty"
            },
            checkLength(value){
                if (value.length < 6) throw new Error('Password must be more than six characters')
            }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
        beforeCreate(insert, option){
            insert.password = hashPassword(insert.password)
        }
    }
  });
  return User;
};