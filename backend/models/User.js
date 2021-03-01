
//MODELE UTILISATEUR
const{ Sequelize, DataTypes}= require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
});

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
module.exports = User;