// CONTROLLER UTILISATEUR - contient la logique métier des routes utilisateur

// importation des packages bcrypt, jwt, 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require ('mysql');
const user=require('../models/User');
const utils=require('../utils/jwtUtils');
const verifInput=require('../utils/verifInput');
  
/*importation du modèle utilisateur*/
const User =require('../models/User');

//Création d'un user
exports.signup = (req, res) => {
    // Valider les paramètres de la requète
    let email = req.body.email;
    let pseudo = req.body.pseudo;
    let password = req.body.password;

    if (email == null || pseudo == null || password == null) {
        res.status(400).json({ error: 'il manque un paramètre' })
    }

    //TO DO => Vérification des saisies user
    let emailOk = verifInput.validEmail(email);
    console.log(emailOk)
    let mdpOK = verifInput.validPassword(password);
    console.log(mdpOK)
    let pseudoOk = verifInput.validUsername(pseudo);
    console.log(pseudoOk)
    if (emailOk == true && mdpOK == true && pseudoOk == true) {
        //Vérification si user n'existe pas déjà
        //TO DO => Vérifier l'username et l'email
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (err, bcryptPassword) {
                        // Création de l'user
                        const newUser = models.User.create({
                            email: email,
                            username: username,
                            password: bcryptPassword,
                            isAdmin: false
                        })
                            .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                            .catch(err => {
                                res.status(500).json({ err })
                            })
                    })
                }
                else {
                    res.status(409).json({ error: 'Cette utilisateur existe déjà ' })
                }
            })
            //.catch(err => { res.status(500).json({ err }) })
    } else {
        console.log('pas cette fois')
    }
};
/*exports.signup = function(mysql, sql, callback, blog) {
  // teste si l'attribut log est true ou false
  if (!blog) {
    let requete_sql = 'SELECT * FROM clics ORDER BY id';
  } else {
    // nous demandons de choisir le premier élément dans
    // l'ordre décroissant, c'est-à-dire le dernier élément
    let requete_sql = 'SELECT * FROM clics ORDER BY id DESC LIMIT 0,1'
  }
  sql.requete(mysql, sql, requete_sql, function(results) {
    callback(results);
  });
}*/
// exportation de la fonction qui va connecter un utilisateur déjà enregistré
exports.login = (req, res, next) =>{
 User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
            { userId: user._id},
            'TOKEN',
            { expiresIn: '24H'}
            )      
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
//Profil d'un user
exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username','isAdmin'],
        where: { id: id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

//modification d'un profil
exports.changePwd = (req, res) => {
    //TO DO:
    //Récupère l'id de l'user et le nouveau password
    let userId = utils.getUserId(req.headers.authorization);
    const newPassword = req.body.newPassword;
    console.log(newPassword)
    //Vérification regex du nouveau mot de passe
    console.log('admin', verifInput.validPassword(newPassword))
    if (verifInput.validPassword(newPassword)) {
        //Vérifie qu'il est différent de l'ancien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                console.log('user trouvé', user)
                bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                    //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                    if (resComparePassword) {
                        res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                    } else {
                        bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                            models.User.update(
                                { password: bcryptNewPassword },
                                { where: { id: user.id } }
                            )
                                .then(() => res.status(201).json({ confirmation: 'mot de passe modifié avec succès' }))
                                .catch(err => res.status(500).json(err))
                        })
                    }
                })
            })
            .catch(err => json(err))
    } else {
        res.status(406).json({ error: 'mot de passe non valide' })
    }
}

//Suppression d'un compte
exports.deleteProfile = (req, res) => {
    //récupération de l'id de l'user
    let userId = utils.getUserId(req.headers.authorization);
    if (userId != null) {
        //Recherche sécurité si user existe bien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {
                    //Delete de tous les posts de l'user même s'il y en a pas
                    models.Post
                        .destroy({
                            where: { userId: user.id }
                        })
                        .then(() => {
                            console.log('Tous les posts de cet user ont été supprimé');
                            //Suppression de l'utilisateur
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.end())
                                .catch(err => console.log(err))
                        })
                        .catch(err => res.status(500).json(err))
                }
                else {
                    res.status(401).json({ error: 'Cet user n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
    }
}