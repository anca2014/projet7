/*recuperation de la balise htlm avec  Id*/
    const signup =document.getElementById('signup');

/*recuperation de la balise html par ID*/

  			const nom=document.getElementById('lastName');
  			const prenom=document.getElementById('name');
  			const mail=document.getElementById('email');
  			const mpasse=document.getElementById('password');
  			const pseud=document.getElementById('pseudo');
  			const travail=document.getElementById('poste');
  			const lieu=document.getElementById('lieux');

signup.addEventListener('submit',function(event){
	event.preventDefault();
  
/*enregistrement dans localstorage*/
    
   let user={
   			lastName:prenom.value,
  			nom :nom.value,
  			email:mail.value,
  			password:mpasse.value,
  		  pseudo:pseud.value,
  		  poste: travail.value,
  		  ville:lieu.value
};
localStorage.setItem('user',JSON.stringify(user));
  
  /*lien vers la page inscription*/
   //document.location.href="blog.html";
/*
socket.on('signup', function(results) {
  // boucle pour parcourir l'array "results"
  for(var i = 0; i < results.length; i++) {
    byId('signup').innerHTML += results[i].signup + '<br>';
  }
});
/*promesse appel API*/
ajax("http://localhost:3000/api/user/signup","POST",(user)).then(response=>{
    console.log(user);
    console.log(response);
    document.location.href="blog.html";
});
});