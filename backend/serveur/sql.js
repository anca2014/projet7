//Pour éviter de devoir changer à plusieurs endroits les données d’accès
// à la base de données, nous créons une fonction qui les retourne :

exports.pool = function(mysql) {
  // informations pour se connecter à la base de données
  var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    // mettre '' comme mot de passe sur Windows
    password : '',
    database : 'groupomania',
    charset  : 'UTF8_UNICODE_CI',
    multipleStatements: true
  });
  // à l'appel de cette fonction, ces informations sont retournées
  return pool;
};

exports.requete = function(mysql, sql, requete_sql, callback) {
  // nous récupérons les données de la fonction pool() écrite plus haut
  // nous utilisons getConnection() pour avoir une connection pool
  sql.pool(mysql).getConnection(function(err, connection) {
    /* lorsque nous avons les informations sur cette connection,
    nous exécutons la requête */
    connection.query(requete_sql, function(err, results) {
      // nous affichons les erreurs, s'il y en a,  à l'aide d'une autre fonction
      sql.query_error(err);
      /* nous testons l'existence du paramètre callback, qui est facultatif si nous
      ne voulons pas obtenir le résultat de la requête (par exemple pour les UPDATE) */
      if(typeof(callback) !== 'undefined') {
        // s'il existe, nous renvoyons les résultats dans une fonction de callback
        callback(results);
      }
      // nous libérons la connection pour éviter de surcharger le pool
      connection.destroy();
    });
  });
};

// cette fonction permet d'afficher une erreur dans la requête SQL
exports.query_error = function(erreur) {
  if (erreur) {
    console.log('query error : ' + erreur.stack);
  }
};

exports.signup = function(mysql, sql, callback, blog) {
  // teste si l'attribut derniere_date est true ou false
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
}