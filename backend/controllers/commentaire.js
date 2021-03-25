//Import
const Post = require('../models/Post');
const utils = require('../utils/jwtUtils');
const fs = require('fs');
const User = require('../models/User');
const Com = require('../models/Commentaire');

//Création d'un post
exports.create=(req,res) =>{
    let photo=req.body.photo;
    let comContent=req.body.comContent;
    if(comContent==null){
       res.status(400).json({error})
    }
        const newCom = Com.create({          
            photo:photo,
            comContent:comContent,
            date_heure:new Date(),
            postId:req.body.postId,
            userId:req.userId
        })
        .then(newCom=>{res.status(201).json({'id':newCom.id})})
};
//Suppression d'un post
exports.delete = (req, res) => {
    //identification du demandeur
    User.findOne({
        where: {id:req.userId}
    })
        .then(user => {
            //Vérification que le demandeur est soit le poster (vérif aussi sur le front)
                Com
                    .findOne({
                        where: { id: req.params.id}
                    })
                    .then((comFind) => {
                            if(user.isAdmin||user.id===userFind.userId){
                            Com
                                .destroy({
                                    where: { id: comFind.id }
                                })
                                .then(() => res.end())
                                 }else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
                             //   .catch(err => res.status(500).json(err))
                      //  }
                    })
                  //  .catch(err => res.status(500).json(err))
        })
   //     .catch(error => res.status(500).json(error));
};