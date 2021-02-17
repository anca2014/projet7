function newblog(){
    /*recuperation de la balise htlm avec  Id*/
    const login =document.getElementById('login');
};
newblog();
console.log(login)
/*promesse appel API*/
ajax("http://localhost:3000/api/user").then(blog=>{
    newblog(blog)
});