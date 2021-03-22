//Recupération token
const user = localStorage.getItem('user');
//___________________________________________________________________________________________
//Création des post utilisateur 'create'
//___________________________________________________________________________________________
    //Recuperation de la balise htlm avec  Id
    const blog =document.getElementById('blog');
    const posts =document.getElementById('post');

		const title =document.getElementById('title');
        const date_heure=document.getElementById('date_heure');
        const photo =document.getElementById('photo');
        const content=document.getElementById('content');
        const pseudo=document.getElementById('pseudo');
        const cree=document.getElementById('cree');
//création évenement au click enregistrement et envoi appel api
      cree.addEventListener('click',function(event){
	event.preventDefault();  
		let post={
				title: title.value,
				content: content.value,
                photo: photo.value,
                pseudo:pseudo.value,
               // postId: postId.value             
		};
/*enregistrement dans localstorage*/
localStorage.setItem('post',JSON.stringify(post));
    /*promesse appel API création post*/
ajax("http://localhost:3000/api/post/create","POST",(post)).then(response=>{
    console.log(post);
    console.log(response)
    post={
        title: title.value,
        photo: photo.value,
        content: content.value,
        pseudo: pseudo.value
          }   
    });
});
//_________________________________________________________________________________________ 
//Affichage des post existant 'listMsg' 
//_________________________________________________________________________________________  
function newresponse(elts){     
      for (let i=0;i<elts.length; i++) {
        //reprise id pour inclure au html et creation des articles
        const listMsg=document.getElementById('listMsg');   
        const article=document.createElement("article");    
        //creation des balises html pour le post à afficher déja crée
        const div= document.createElement("div");
        const h3= document.createElement("h3");
        const h4= document.createElement("h4");
        const p= document.createElement("p");
        const img= document.createElement("img");
        const h5= document.createElement("h5");

        
       //creation balise pour creation du commentaire;
        const image=document.createElement('img');
        const photo=document.createElement('input');
        const span= document.createElement("span");
        const label= document.createElement("label");
        const button=document.createElement("button");
       
        const id= document.createElement("input");
        const comContent= document.createElement("input");
        let newText=document.createTextNode('Commentaire') 
        label.appendChild(newText);  
        //creation evenement pour envoi du commentaire 
        const form=document.createElement("form");
        form.addEventListener('submit',function(event){
        event.preventDefault();  
        let commentaire={
                comContent: comContent.value,
                pseudo: pseudo.value, 
                photo: photo.value,
                postId: elts[i].id,                        
        };
//promesse appel API pour afficher un commmentaire
ajax("http://localhost:3000/api/commentaire/create","POST",(commentaire)).then(commentaire=>{
    });
}); 
        //affichage des commentaire au post**************************
elts[i].commentaires.forEach(commentaire =>{
        // affichage des commentaire
        const message=document.createElement("div");
        const heure=document.createElement("time");
        const comm =document.createElement("p");
        const photo=document.createElement("img");
        const pseudo=document.createElement("h6");

        message.appendChild(comm);
        message.appendChild(heure);
        message.appendChild(photo);
        message.appendChild(pseudo);

        message.classList.add("list")
        photo.classList.add("image");

        article.appendChild(message);

      
        heure.textContent=commentaire.date_heure,      
        comm.textContent=commentaire.comContent,
        photo.src=commentaire.photo,
        pseudo.textContent=commentaire.user.pseudo,
        id.texteContent=commentaire.id,
        postId= elts[i].id   
           
    });
//fin d'affichage des commentaires au post*************************
       /*______________________________________________________________
      /*  rajout des classes(css)*/
        photo.classList.add("photo","form-control");
        image.classList.add("image");

        comContent.classList.add("form-control");
        id.classList.add("form-control");
        button.classList.add("cart-button");
        img.classList.add("image");
        div.classList.add("actu");
        
        /*_______________________________________________________________
        Contenu html*/
        //contenu du post
        h3.textContent=elts[i].title;
        h4.textContent=elts[i].date_heure;
        p.textContent=elts[i].content;
        h5.textContent=elts[i].user.pseudo;
        img.src=elts[i].photo ? elts[i].photo : 'icon-above-font.png';
       // image.src=elts[i].photo;
        //contenu html
        button.textContent="Poster";
        label.textContent="Ecrire un commentaire";
        photo.src=elts[i].photo;
    
        /*________________________________________________________________
        Mise en place du bloc html*/
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(p);
        div.appendChild(img);
        
        span.appendChild(label);
        span.appendChild(form);

        photo.appendChild(image);

        form.appendChild(comContent);
        form.appendChild(button);
        form.appendChild(photo);

    
        article.appendChild(div);
        article.appendChild(span);
        

        listMsg.appendChild(article);
  };
};

//appel get de tous les post piblier
ajax("http://localhost:3000/api/post/","GET").then(response=>{
    newresponse(response);  
    console.log(listMsg);
    console.log(response); 
    });

