// MODELE D'UTILISATEUR

const mysql = require ('mysql')
var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'username', 'password', {
host: 'localhost',
dialect: 'mysql',
logging: false,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});
//on exporte pour utiliser notre connexion depuis les autre fichiers.
var exports = module.exports = {};
exports.sequelize = sequelize;

//exemple de création d'un utilisateur, puis de sa suppression dans la foulée. Ce qui permet de voir comment effectuer des requêtes successives.
    Model.User.create({
        name: 'Test',
        email : 'test@testmail.com'
    }).then(user => {
        return user.destroy();
    }).then(destroy => {
        //traitement terminé...
    }).catch(function (e) {
        //gestion erreur
    });
/**
 * ROLE
 */
/*const Role = sequelize.define('role', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: Sequelize.STRING(255), allowNull: false},
},
        {tableName: 'role', timestamps: false, underscored: true}//par default "tableName" serait "roles" (au pluriel), "timestamps" crée 2 champs automatique pour les dates de création et de modification (très pratique si nécessaire) et "underscored" permet de créer automatiquement des champs de "relation" entre les tables de type "role_id" plutôt que "UserId".
);
exports.Role = Role;*/


const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: Sequelize.STRING(255), allowNull: false, },
    email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
},
        {tableName: 'users', timestamps: false, underscored: true}
);
exports.User = User;

//création du schéma de données qui contient les caractéristiques pour chaque utilisateur
const UserModels  {
    constructor(){}
    signup(sqlInserts){
        let sql = 'INSERT INTO users VALUES(NULL, ?, ?, ?, ?, NULL)';
        sql = mysql.format(sql, sqlInserts);}
    login(sqlInserts){
            let sql = 'SELECT * FROM users WHERE email = ?';
            sql = mysql.format(sql, sqlInserts);}
    updateUser(sqlInserts){
                let sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
                sql = mysql.format(sql,sqlInserts);} 
    deleteUser(sqlInserts){
                    let sql = 'DELETE FROM users WHERE id = ?'; 
                    sql = mysql.format(sql,sqlInserts);}     
}
console.log(UserModels);
// exportation du modèle d'utilisateur
UserModels();
module.exports = UserModels;

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Post)
  };
  return User;
};