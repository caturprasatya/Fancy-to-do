'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
      // define association here
      Todo.belongsTo( models.User , { foreignKey : "userId" })
    }
  };
  Todo.init({
    title: {
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                args : true,
                msg: "Title cannot empty"
            }
        }
    },
    description: {
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                args:true,
                msg:"Description cannot empty"
            }
        }
    },
    status: {
        type:DataTypes.BOOLEAN,
        validate:{
            notEmpty:{
                args:true,
                msg:"Status cannot empty"
            }
        }
    },
    due_date: {
        type: DataTypes.DATE,
        validate: {
            checkDate(value){
                if(value.getDate() < new Date().getDate()) throw new Error("Date must be today or tomorrow") 
            }
        }
    }, 
    userId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};