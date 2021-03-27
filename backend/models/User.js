//MODELE UTILISATEUR
const{ Sequelize, DataTypes}= require('sequelize');
const Post= require('./Post.js');
const Commentaire= require('./Commentaire.js');
const mysql = require('mysql');
//const db = require('./db.js');
//const dotenv =require('dotenv');
//require('dotenv').config();

const sequelize = new Sequelize('sql11396409', 'sql11396409', 'JVtyC2y7Dp', {
   host:'sql11.freemysqlhosting.net',
   dialect: 'mysql'
});


/*const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
   host: process.env.DB_HOST,
   dialect:'mysql'
});*/

 const User= sequelize.define('user',{
    id:{type:Sequelize.INTEGER, autoIncrement: true, primaryKey:true },
	  pseudo: {type:Sequelize.STRING(30),allowNull :false},
	  email:{type:Sequelize.STRING(50),allowNull :false,unique : true},
    password:{type:Sequelize.STRING(255),allowNull:false},
    lastName:{type:Sequelize.STRING(255),allowNull :false,unique:true},
    firstName:{type:Sequelize.STRING(255),allowNull: false, unique: true},
    avatar:{type:Sequelize.STRING(255), allowNull: true},
    IsAdmin :Sequelize.BOOLEAN
},
        {tableName :'users',timestamps : false, undescored : true}
);
Post.belongsTo(User,{
 foreingKey:'userId'
})
User.hasMany(Commentaire,{
 foreingKey:'userId'
})
Commentaire.belongsTo(User,{
 foreingKey:'userId'
})
module.exports = User;