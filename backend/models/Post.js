//MODELE POST
const{ Sequelize, DataTypes}= require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
});

 const Post= sequelize.define('post',{
    id:{type:Sequelize.INTEGER, autoIncrement: true, primaryKey:true },
    userId: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull :false,unique:true},
    date_heure: {type:Sequelize.DATE, allowNull:false},
    title:{type:Sequelize.STRING(50), allowNulle: false},
    content:{type:Sequelize.TEXT, allowNulle: false},
    photo:{ type: Sequelize.STRING(255, allowNull:true)},
    avatar:{type:Sequelize.STRING(255), allowNull: true},
    IsAdmin :Sequelize.BOOLEAN
},
        {tableName :'posts',timestamps : false, undescored : true}
);
module.exports = Posts;

/*//MODELE POST 
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
  },
    {});
  Post.associate = function (models) {
    // associations can be defined here
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};*/