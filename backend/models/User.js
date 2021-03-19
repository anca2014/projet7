
//MODELE UTILISATEUR
const{ Sequelize, DataTypes}= require('sequelize');
const Post= require('./Post.js');
const Commentaire= require('./Commentaire.js');
const sequelize = new Sequelize('sql11396409', 'sql11396409', 'JVtyC2y7Dp', {
   host: 'sql11.freemysqlhosting.net',
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
User.hasMany(Post,{
 foreingKey:'userId'
})
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