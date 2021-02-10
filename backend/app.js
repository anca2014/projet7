// APPLICATION EXPRESS

// importation du framework express et des package body-parser, mongoose path et helmet
const express=require('express');
const bodyParser=require('body-parser');

// importation des routeurs 

//const postsRoutes = require('./routes/....');
const userRoutes = require('./routes/user.js');
const postRoutes= require('./routes/post.js');

const path= require('path');

// création de l'application express
const app=express();


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

// enregistrement des routeurs sauce et utilisateur pour n'importe quelle requête effectuée vers /api/sauces et /api/auth
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);


module.exports = app;