//MODELE COMMENTAIRE
const{ Sequelize, DataTypes}= require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
});

const Commentaire= sequelize.define('commentaire',{
    id:{type:Sequelize.INTEGER, autoIncrement: true, primaryKey:true },
    userId: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull :false,unique:true},
    postId:{type: Sequelize.INTEGER(11).UNSIGNED, allowNull :false,unique:true},
    date_heure: {type:Sequelize.DATE, allowNull:false},
    comContent:{type:Sequelize.TEXT, allowNulle: false},
    photo:{ type: Sequelize.STRING(255, allowNull:true)},
},
        {tableName :'commentaires',timestamps : false, undescored : true}
);
module.exports = Posts;