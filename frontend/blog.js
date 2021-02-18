function newblog(){
    /*recuperation de la balise htlm avec  Id*/
    const blog =document.getElementById('blog');
};

/*promesse appel API*/
ajax("http://localhost:3000/api/groupomania/auth").then(blog=>{
    newblog(blog)
});