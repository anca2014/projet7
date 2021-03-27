# projet7Bonjour, voici mon Projet 7. Pour démarrer celui-ci 
•	Clonez le projet et ouvrez le avec votre IDE
•	Installez les modules avec npm i
•	Dans un terminal > cd backend > nodemon server
Pour démarrer la base de données, vous devez au préalable avoir mySQL sur votre ordinateur.
Dans le dossier backend vous avez un fichier ".env",  dans lequel vous trouvez les donnée de la base de données
Qui corresponde à
HOST =serveur= sql11.freemysqlhosting.net
DATABASE= base de données =sql11396409
USER =utilisateur= sql11396409
PASS =mot passe =JVtyC2y7Dp
Mon serveur hébergeur freemysql ne fonctionnement plus pour le moment vous devez modifier manuellement après avoir télécharger le fichier groupomania.sql.
Dans le fichier BACKEND=>app.js et dans BACKEND=>models=> et modifier dans les trois modèle(user,post et commentaire)
Remplir la constante  suivante par vos données
//const sequelize = new Sequelize('sql11396409', 'sql11396409', 'JVtyC2y7Dp', {
   host:'sql11.freemysqlhosting.net',
   dialect: 'mysql'
});//
