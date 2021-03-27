//MODELE POST
const{ Sequelize, DataTypes}= require('sequelize');
const User=require('./User.js');
const Commentaire=require ('./Commentaire.js');
//const db = require('./db.js');

//require('dotenv').config();

const sequelize = new Sequelize('sql11396409', 'sql11396409', 'JVtyC2y7Dp', {
   host:'sql11.freemysqlhosting.net',
   dialect: 'mysql'
});
/*const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
   host: process.env.DB_HOST,
   dialect: 'mysql'
});*/

 const Post= sequelize.define('post',{
    id:{type:Sequelize.INTEGER, autoIncrement: true, primaryKey:true },
    userId: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull :false,unique:true},
    date_heure: {type:Sequelize.DATE, allowNull:false},
    title:{type:Sequelize.STRING(50), allowNull: false},
    content:{type:Sequelize.TEXT, allowNull: false},
    photo:{ type: Sequelize.STRING(255), allowNull:true},
},
        {tableName :'posts',timestamps : false, undescored : true}
);
 Post.hasMany(Commentaire,{
 foreingKey:'postId'
})
Commentaire.belongsTo(Post,{
 foreingKey:'postId'
})
module.exports = Post;