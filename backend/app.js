// APPLICATION EXPRESS

// importation du framework express et des package body-parser, mongoose path et helmet
const http = require('http');
const path= require('path');
const express=require('express');
const bodyParser=require('body-parser');

const userRoutes=require('./routes/user.js');
const postRoutes = require('./routes/post.js');

// récupération du module node-mysql
const mysql = require('mysql');
//création de l'application express
const app=express();
const server = http.Server(app);
const io = require('socket.io')(server);

const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
});
// récupération des fonctions du fichier sql.js
//const sql = require('./serveur/sql.js');

/*const routes = require('./serveur/routes.js');
const socket = require('./serveur/socket.js');


routes.f(app, __dirname, mysql, sql);
socket.f(io, mysql, sql);

server.listen(8888);*/
// ajout de headers pour toutes les requêtes afin d'autoriser n'importe quel utilisateur à accéder à l'application
//résolution erreurs cors
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

// enregistrement des routeurs post et utilisateur pour n'importe quelle requête effectuée vers /api/posts et /api/user
app.use('/api/post',postRoutes);
app.use('/api/user',userRoutes);

// établissement de la connexion
io.on('connection', (socket) =>{
   console.log(`Connecté au client ${socket.id}`)
})
module.exports = app;