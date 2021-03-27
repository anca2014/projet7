// Connexion à la bade de données MySQL
const mysql = require('mysql');

require('dotenv').config()

const db = mysql.createConnection(
{
	database:process.env.DB_DATABASE, 
	user:process.env.DB_USER, 
	pass:process.env.DB_PASS,
	
	host: process.env.DB_HOST,
    dialect: 'mysql'
    })



/*const db= mysql.createConnection (
{
	database:process.env.DB_DATABASE, 
	user:process.env.DB_USER, 
	pass:process.env.DB_PASS, 
	
   host: process.env.DB_HOST,
   dialect: 'mysql'
})*/

// Connection 
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL est connecté :)');
});

module.exports = db;
