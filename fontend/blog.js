function newblog(){
    /*recuperation de la balise htlm avec  Id*/
    const blog =document.getElementById('blog');
};

/*promesse appel API*/
ajax("http://localhost:3000/api/groupomania").then(blog=>{
    newblog(blog)
});
if (typeof(results[0].date) !== 'undefined') { %>
  <!-- /*nul besoin de parcourir une boucle
  puisqu'il n'y aura qu'un seul résultat à la requête SQL */-->
  <br><%= results[0].date %>
<% } %>
socket.on('charger_derniere_date', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'derniere_date');
  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // on ajoute le contenu de derniere_date.ejs aux dates existantes
      byId('dates').innerHTML += xhr.responseText;
      // rappel : byId() = document.getElementById()
    }
  });
  xhr.send(null);
});