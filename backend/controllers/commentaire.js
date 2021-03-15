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
    Com.findOne({
        attributes:['comContent'],
        where:{comContent:comContent, postId:req.body.postId}
    })
    .then(com=>{
        const newCom = Com.create({
           
            photo:photo,
            comContent:comContent,
            date_heure:new Date(),
            postId:req.body.postId,
            userId:req.userId
        })
        .then(newCom=>{res.status(201).json({'id':newCom.id})})
  })
};