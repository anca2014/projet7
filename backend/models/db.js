// Connexion à la bade de données MySQL
const mysql = require('mysql');

require('dotenv').config()

// Création de la connexion
const db = mysql.createConnection({
    serveur     : process.env.DB_SERVEUR,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'sql11396409'
});

// Connection 
db.connect((err) => {
    if(err){
       // throw err;
    }
    console.log('MySQL est connecté :)');
});

module.exports = db;