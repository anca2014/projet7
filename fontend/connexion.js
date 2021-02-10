function newblog(){
    /*recuperation de la balise htlm avec  Id*/
    const login =document.getElementById('login');
};

/*promesse appel API*/
ajax("http://localhost:3000/api/groupomania").then(blog=>{
    newblog(blog)
});