// MIDDLEWARE DE CONFIGURATION DE MULTER POUR LA GESTION DES FICHIERS ENTRANTS

// importation du package multer
const multer = require('multer');

// dictionnaire de mime_types
const MINE_TYPES ={
	'image/jpg' : 'jpg',
	'image/jpeg' : 'jpg',
	'image/png' : 'png'
};

// création d'un objet de configuration pour multer
const storage = multer.diskStorage({
	destination : (req, file, callback) =>{
		callback(null, 'images')
	},
	filename: (req, file, callback) =>{
		const name = file.originalname.split('').join('_');
		const extension = MINE_TYPES[file.minetype];
		callback(null, name +Date.now() +'.' + extension);
	}
});

// exportation du middleware multer configuré
module.exports = multer({ storage }).single('image');