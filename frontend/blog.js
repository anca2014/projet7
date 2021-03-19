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
        const listMsg=document.getElementById('listMsg');   
        const article=document.createElement("article");    
        //creation des balises html pour le post afficher
        const div= document.createElement("div");
        const h3= document.createElement("h3");
        const h4= document.createElement("h4");
        const p= document.createElement("p");
        const img= document.createElement("img");
        const h5= document.createElement("h5");

        // affichage des commentaaire
        const message=document.createElement("div");
        const heure=document.createElement("time");
        const comm =document.createElement("p");
        const photo=document.createElement("img");

       //creation balise pour creation du commentaire
        //const commentaire=document.getElementById('commentaire')
        const span= document.createElement("span");
        const label= document.createElement("label");
        const button=document.createElement("button");
       // button.addEventListener('onclick',function)
       
        const id= document.createElement("input");
        const comContent= document.createElement("input");
        let newText=document.createTextNode('Commentaire') 
        label.appendChild(newText);  

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
elts[i].commentaires.forEach(commentaire =>{
        //console.log(commentaire)
        heure.textContent=commentaire.date_heure,      
        comm.textContent= commentaire.comContent,
        photo.textContent=commentaire.photo,
        id.texteContent=commentaire.Id,
        postId= elts[i].id;          
    });
       /*______________________________________________________________
        rajout des classes(css)*/
        comContent.classList.add("form-control");
        id.classList.add("form-control");
        button.classList.add("cart-button");
        img.classList.add("image");
        div.classList.add("actu");
        message.classList.add("list")
        /*_______________________________________________________________
        Contenu html*/
        //contenu du post
        h3.textContent=elts[i].title;
        h4.textContent=elts[i].date_heure;
        p.textContent=elts[i].content;
        h5.textContent=elts[i].user.pseudo;
        img.src=elts[i].photo ? elts[i].photo : 'icon-above-font.png';
        //contenu html
        button.textContent="Poster";
        label.textContent="Commentaire";
    
        /*________________________________________________________________
        Mise en place du bloc html*/
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(p);
        div.appendChild(img);
        
        span.appendChild(label);
        span.appendChild(form);

        form.appendChild(comContent);
        form.appendChild(button);
    
        message.appendChild(comm);
        message.appendChild(heure);
        message.appendChild(photo);

        article.appendChild(div);
        article.appendChild(span);
        article.appendChild(message);

        listMsg.appendChild(article);
  };
};

//appel get de tous les post piblier
ajax("http://localhost:3000/api/post/","GET").then(response=>{
    newresponse(response);  
    console.log(listMsg);
    console.log(response); 
    });

