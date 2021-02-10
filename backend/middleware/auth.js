// MIDDLEWARE DE VERIFICATION DES TOKENS ENVOYES AVEC LES REQUETES ET DE PROTECTION DES ROUTES

const jwt = require('jsonwebtoken');

// exportation de la fonction middleware qui va vérifier le token envoyé avant d'autoriser les requêtes
module.exports = (req, res, next) =>{
 	try{
 		const token = req.headers.authorization.split(' ')[1];// récupération du token dans le header authorization
 		const decodedToken = jwt.verify(token, 'TOKEN'); // vérification du token
 		const userId = decodedToken.userId; // décodage du token
 		if (req.body.userId && req.body.userId !== userId){
 		  throw ('Invalid user ID')
 		  }else { next();
 		  }
 	}
 	 catch (error){
 			res.status(401).json({ error: error | 'Invalid request'});
 	}
 };