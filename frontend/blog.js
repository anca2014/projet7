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
        /*structure htlm
        -------------------------------------------------------------------
<section id="listMsg">
    <div>
        <h3 id="title"></h3>
        <h4 id="date_heure"></h4>
        <h5 id="pseudo"></h5>
        <p id="content"></p>
        <img id="photo" class="photo">
    </div>   
    <span class="form-group">
        <label for="content">Commentaire</label>
         <form>
         <input type="content" class="form-control" id="comContent" formControlName="content">
         <button type = "submit" name = "addToCart" class = "cart-button"> Poster </button>
         </form>
    </span>           
</section>
        ------------------------------------------------------------------*/
        //creation des balises htlm
        const div= document.createElement("div");
        const h3= document.createElement("h3");
        const h4= document.createElement("h4");
        const p= document.createElement("p");
        const img= document.createElement("img");
        const h5= document.createElement("h5");
       
        const commentaire=document.getElementById('commentaire')
        const span= document.createElement("span");
        const label= document.createElement("label");
        const button=document.createElement("button")
        const comContent= document.createElement("input");
        let newText=document.createTextNode('Commentaire') 
        label.appendChild(newText);   
        const form=document.createElement("form");
        form.addEventListener('submit',function(event){
    event.preventDefault();  

        let commentaire={
                comContent: comContent.value,
                pseudo:pseudo.value 
                postId:req.body.postId,
                userId:req.userId             
        };
//promesse appel API pour afficher un commmentaire
ajax("http://localhost:3000/api/commentaire/create","POST",(commentaire)).then(response=>{
    console.log(commentaire);
    console.log(response)
    commentaire={
        photo: photo.value,
        comContent: comContent.value,
        pseudo: pseudo.value,
        postId:req.body.postId,
        userId:req.userId
    }    
    });
});      
        /*______________________________________________________________
        rajout des classes(css)*/
        comContent.classList.add("form-control");
        button.classList.add("cart-button");
        img.classList.add("image");
       
        /*_______________________________________________________________
        Contenu htlm*/
        h3.textContent=elts[i].title;
        h4.textContent=elts[i].date_heure;
        p.textContent=elts[i].content;
        h5.textContent=elts[i].user.pseudo;
        img.src=elts[i].photo ? elts[i].photo : 'icon-above-font.png';
        button.textContent="Poster";
        label.textContent="Commentaire";

        /*________________________________________________________________
        Mise en place du bloc htlm*/
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(p);
        div.appendChild(img);
        
        span.appendChild(label);
        span.appendChild(comContent);
        span.appendChild(form);
        span.appendChild(button);

        form.appendChild(comContent);
        form.appendChild(button);

        listMsg.appendChild(div);
        listMsg.appendChild(span);
  };
};
//appel get de tous les post piblier
ajax("http://localhost:3000/api/post/","GET").then(response=>{
    newresponse(response);  
    console.log(listMsg);
    console.log(response) 
    });

