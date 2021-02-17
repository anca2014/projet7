// MIDDLEWARE DE VERIFICATION DES TOKENS ENVOYES AVEC LES REQUETES ET DE PROTECTION DES ROUTES

const jwt = require('jsonwebtoken');
const models = require('../models');

// exportation de la fonction middleware qui va vérifier le token envoyé avant d'autoriser les requêtes
module.exports = (req, res, next) =>{
 	try{
 		const token = req.headers.authorization.split(' ')[1];// récupération du token dans le header authorization
 		const decodedToken = jwt.verify(token, 'TOKEN'); // vérification du token
 		//Initialisation d'un user ID à null pour permettre la condition
 		const userId=Null
 		

 		 userId = decodedToken.userId; // décodage du token
 		if (req.body.userId && req.body.userId !== userId){
 			res.status(401).json({error:"identification non valide"})
 		  //throw ('Invalid user ID')
 		  }else {
 		   next();
 		  }
 	}
 	 catch (error){
 			res.status(401).json({ error: error | 'Invalid request'});
 	}
 };