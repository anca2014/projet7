// MODELE D'UTILISATEUR

const mysql = require ('mysql')

/* création du schéma de données qui contient les caractéristiques pour chaque utilisateur
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

module.exports = UserModels;*/

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