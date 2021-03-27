//MODELE COMMENTAIRE
const{ Sequelize, DataTypes}= require('sequelize');
const User=require('./User.js');
const Post= require('./Post.js');
//const db = require('./db.js');

//require('dotenv').config();

const sequelize = new Sequelize('sql11396409', 'sql11396409', 'JVtyC2y7Dp', {
   host:'sql11.freemysqlhosting.net',
   dialect: 'mysql'
});
/*const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
   host: process.env.DB_HOST,
   dialect: 'mysql'
});
*/

const Commentaire= sequelize.define('commentaire',{
    id:{type:Sequelize.INTEGER, autoIncrement: true, primaryKey:true },
    userId: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull :false,unique:true},
    postId:{type: Sequelize.INTEGER(11).UNSIGNED, allowNull :false,unique:true},
    date_heure: {type:Sequelize.DATE, allowNull:false},
    comContent:{type:Sequelize.TEXT, allowNull: false},
    photo:{ type: Sequelize.STRING(255), allowNull:true},
},
        {tableName :'commentaires',timestamps : false, undescored : true}
);

/*Commentaire.belongsTo(Post,{
 foreingKey:'postId'
})*/

module.exports = Commentaire;