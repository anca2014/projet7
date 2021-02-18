
//MODELE UTILISATEUR
const{ Sequelize, DataTypes}= require('sequelize');
const sequelize =new Sequelize('mysql:memory:');

 const User= sequelize.define('user',{
    id:{type:Sequelize.INTEGER, autoIncrement: true, primaryKey:true },
    name: {type:Sequelize.STRING(255),allowNull :false,},
    email:{type:Sequelize.STRING(255),allowNull :false,unique : true},
    password:Sequelize.STRING,
    IsAdmin :Sequelize.BOOLEAN
},
        {tableName :'users',timestamps : false, undescored : true}
);
module.exports = User;