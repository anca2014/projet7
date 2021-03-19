//Import
const Post = require('../models/Post');
const utils = require('../utils/jwtUtils');
const fs = require('fs');
const User = require('../models/User');
const Commentaire = require('../models/Commentaire');


//Création d'un post
exports.create=(req,res) =>{
    let title=req.body.title;
    let photo=req.body.photo;
    let content=req.body.content;
    if(title==null|| content==null){
        res.status(400).json({error})
    }
    Post.findOne({
        attributes:['content'],
        where:{content:content}
    })
    .then(post=>{
        const newPost = Post.create({
            title:title,
            photo:photo,
            content:content,
            date_heure:new Date(),
            userId:req.userId
        })
        .then(newPost=>{res.status(201).json({'id':newPost.id})})
  })

};
//Afficher les posts sur le mur
exports.listMsg = (req, res) => {
    Post.findAll({
       include: [User,{model:Commentaire,include:[User]}],
        order: [['date_heure', 'DESC']]
    })
        .then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}

//Suppression d'un post
exports.delete = (req, res) => {
    //req => userId, postId, user.isAdmin
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization)
    User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Suppression du post id :', req.body.postId);
                Post
                    .findOne({
                        where: { id: req.body.postId }
                    })
                    .then((postFind) => {

                        if (postFind.attachement) {
                            const filename = postFind.attachement.split('/images/')[1];
                            console.log("teseeeest", filename);
                            fs.unlink(`images/${filename}`, () => {
                                models.Post
                                    .destroy({
                                        where: { id: postFind.id }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        }
                        else {
                            Post
                                .destroy({
                                    where: { id: postFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
        })
        .catch(error => res.status(500).json(error));
};

//Modification d'un post
exports.update = (req, res) => {
    //récupération de l'id du demandeur pour vérification
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Modif ok pour le post :', req.body.postId);
                Post
                    .update(
                        {
                            content: req.body.newText,
                            attachement: req.body.newImg
                        },
                        { where: { id: req.body.postId } }
                    )
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
            }
            else {
                res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
            }
        }
        )
        .catch(error => res.status(500).json(error));
}