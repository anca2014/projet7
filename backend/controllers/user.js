// CONTROLLER UTILISATEUR - contient la logique métier des routes utilisateur

// importation des packages bcrypt, jwt, 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require ('mysql');
//const user=require('../models/User');
const utils=require('../utils/jwtUtils');
const verifInput=require('../utils/verifInput');
  
/*importation du modèle utilisateur*/
const User= require('../models/User');

//Création d'un user
exports.signup = (req, res) => {
    // Valider les paramètres de la requète
    let email = req.body.email;
    let pseudo = req.body.pseudo;
    let password = req.body.password;
    let lastName = req.body.lastName;
    let firstName = req.body.firstName

    if (email == null || pseudo == null || password == null) {
        res.status(400).json({ error: 'il manque un paramètre' })
    }

    //TO DO => Vérification des saisies user
    let emailOk = verifInput.validEmail(email);
    console.log(emailOk)
    let mdpOK = verifInput.validPassword(password);
    console.log(mdpOK)
    let pseudoOk = verifInput.validPseudo(pseudo);
    console.log(pseudoOk)
    if (emailOk == true && mdpOK == true && pseudoOk == true) {
        //Vérification si user n'existe pas déjà
        //TO DO => Vérifier l'username et l'email
        User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (err, bcryptPassword) {
                        // Création de l'user
                        const newUser = User.create({

                            lastName: lastName,
                            firstName: firstName,
                            email: email,
                            pseudo: pseudo,
                            password: bcryptPassword,
                            IsAdmin: false
                        })
                          .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                         // .catch(err => {
                          //	res.status(500).json({ err })
                          	 })
               // })
               }
                 else {
                    res.status(409).json({ error: 'Cette utilisateur existe déjà ' })
                }
            })	
           .catch(err => { res.status(500).json({ err }) })
    } else {
        //console.log('pas cette fois')
    }
};
exports.login = async (req, res) => {
  //try {
      user= await  User.findOne({
      where: { email: req.body.email
      },
    }); // on vérifie que l'adresse mail figure bien dan la bdd
    if (user === null) {
      return res.status(403).json({ error: "Connexion échouée" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
      if (!hash) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      } else {
        res.status(200).json({
          // on renvoie le user et le token
            userId: user.id,
            token: jwt.sign(
            { userId: user.id},
            'dddfffggghhh',
            { expiresIn: '24H'}
            )      
        });
      }
    }
  };


/*Profil d'un user
exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    User.findOne({
        attributes: ['id', 'email', 'pseudo','isAdmin'],
        where: { id: id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

//modification d'un profil
exports.changePwd = (req, res) => {
    //TO DO: Récupère l'id de l'user et le nouveau password
    let userId = utils.getUserId(req.headers.authorization);
    const newPassword = req.body.newPassword;
    console.log(newPassword)
    //Vérification regex du nouveau mot de passe
    console.log('admin', verifInput.validPassword(newPassword))
    if (verifInput.validPassword(newPassword)) {
        //Vérifie qu'il est différent de l'ancien
        User.findOne({
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
                            User.update(
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
        User.findOne({
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
                            User
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
}*/