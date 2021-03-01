
/*addition = () =>{
    //Vérifie si un prduit est dans le panier
    if(JSON.parse(localStorage.getItem("user")))
    	//S'il n'est pas vide on sup
      document.getElementById("post").remove();
  };
    /*recuperation de la balise htlm avec  Id*/
    const blog =document.getElementById('blog');
    const post =document.getElementById('post');
    /*structure html du code
      -------------------------------------------------------------------------
			<div class="post">
				<div class="info">
            		<h1 id="title"></h3>
            		<h2 id="date_heure"></h4>
            	</div>
            	<div class="contenu">
            		<img id="photo">
            		<p id="content"></p >
            	</div>
*/
      
	/*	const title =document.getElementById('title');
        const date_heure=document.getElementById('date_heure');
        const photo =document.getElementById('photo');
        const content=document.getElementById('content');

      post.addEventListener('submit',function(event){
	event.preventDefault();  

		let post={
				title: title.value,
				photo: photo.value,
				content: content.value

		};*/

/*enregistrement dans localstorage*/
localStorage.setItem('post',JSON.stringify(post));

    /*promesse appel API*/
ajax("http://localhost:3000/api/post/create","POST",(post)).then(response=>{
    console.log(post);
    console.log(response);  
    });
