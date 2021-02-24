
    /*recuperation de la balise htlm avec  Id*/
    const login =document.getElementById('login');

    const email=document.getElementById('email');
    const motpasse=document.getElementById('password');

    login.addEventListener('submit',function(event){
	event.preventDefault();
 let user={       
        email:email.value,
        password:motpasse.value,    
};  
 console.log(login);

/*promesse appel API*/
ajax("http://localhost:3000/api/user/login","POST",(user)).then(response=>{
    console.log(user);
    console.log(response);
     user={       
        email:email.value,
        token:response.token,    
};  
    localStorage.setItem('user',JSON.stringify(user));
    console.log(localStorage.getItem('user'));
    document.location.href="blog.html";
  });
});