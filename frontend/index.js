//page accueil authentification

function newblog(){
    /*recuperation de la balise htlm avec  Id*/
};
console.log(newblog);
/*promesse appel API*/
ajax("http://localhost:3000/api").then(blog=>{
    newblog(blog)
});

/*export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    disconnect() {
      localStorage.clear();
      location.replace(location.origin);
    }
  }
};*/