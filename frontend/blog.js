//Recupération token
const user = localStorage.getItem('user');

    /*recuperation de la balise htlm avec  Id*/
    const blog =document.getElementById('blog');
    const posts =document.getElementById('post');

 
		const title =document.getElementById('title');
        const date_heure=document.getElementById('date_heure');
        const photo =document.getElementById('photo');
        const content=document.getElementById('content');
        const cree=document.getElementById('cree');

      cree.addEventListener('click',function(event){
	event.preventDefault();  

		let post={
				title: title.value,
				content: content.value,
                photo: photo.value,
                userId: user._id,
		};

/*enregistrement dans localstorage*/
localStorage.setItem('post',JSON.stringify(post));

    /*promesse appel API*/
ajax("http://localhost:3000/api/post/create","POST",(post),(user)).then(response=>{
    console.log(post);
    console.log(response)
    post={
        title: title.value,
        photo: photo.value,
        content: content.value,
    }
    
    });
});
  console.log(user);
  console.log(post);
      const listMsg=document.getElementById('listMsg');

ajax("http://localhost:3000/api/post/","GET",(post),(user)).then(response=>{
    console.log(listMsg);
    console.log(response);  
    });