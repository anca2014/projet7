// MIDDLEWARE DE VERIFICATION DES TOKENS ENVOYES AVEC LES REQUETES ET DE PROTECTION DES ROUTES

/*const jwt = require('jsonwebtoken');
const user = require('../models/User');

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
 		  throw ('Invalid user ID')
 		  }else {
 		   next();
 		  }
 	}
 	 catch (error){
 	 	res.status(401).json({ error: error | 'Invalid request'});
};
};*/

// Imports
const jwt = require('jsonwebtoken');

// Exportation de la fonction d'authentification
module.exports = (req, res, next) => {
    // Récupération du token dans les paramètres
    const authHeader = req.headers.authorization;

    // Si l'utilisateur possède une autorisation,
    // on déclare le token et on le vérifie, s'il n'y a pas
    // d'erreur, on le next, sinon on renvoie un statut 403
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'DEVELOPMENT_TOKEN_SECRET', (err, user) => {
            if (err) {
                return res.status(403);
            }
            next();
        });
    }
    // Sinon, on renvoie le statut 401 Unauthorized
    else {
        res.status(401).json({error:"accès non authorisé"});
    }
};