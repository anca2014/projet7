// APPLICATION EXPRESS

// importation du framework express et des package body-parser, mongoose path et helmet
const http = require('http');
const path= require('path');
const express=require('express');
const bodyParser=require('body-parser');
//const db = require('./models/db.js');
const userRoutes=require('./routes/user.js');
const postRoutes = require('./routes/post.js');
const comRoutes = require('./routes/commentaire.js')
//require('dotenv').config();

const app=express();
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sql11396409', 'sql11396409', 'JVtyC2y7Dp', {
   host:'sql11.freemysqlhosting.net',
   dialect: 'mysql'
});


/*const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
   host:process.env.DB_HOST ,
   dialect: 'mysql'
});*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');/*d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  /*d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;*/
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();/*d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)*/
});

// transformation du corps des requêtes en objets javascript utilisables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// gestion de la ressource images de manière statique
app.use('/images', express.static(path.join( __dirname, 'images')));

// enregistrement des routeurs post, utilisateur et commentaire pour n'importe quelle requête effectuée vers /api/posts et /api/user
app.use('/api/post',postRoutes);
app.use('/api/user',userRoutes);
app.use('/api/commentaire', comRoutes);

module.exports = app;