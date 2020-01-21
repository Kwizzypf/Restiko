//      _____  ____   ____   _____   ___  ______    _____  ____   ____      ___  __    ____   ___               ___   _  _   
//     |_____ |      |____)    |    |___)   |       |__   |    | |____)      |   | \ | |   ) |_    \ /     |__|  |   | \/ | |
//     _____| |____  |   \   __|__  |       |       |     |____| |   \      _|__ |  \| |_ /  |___  / \  [] |  |  |   |    | |___

var tableRestiko = []; //tableau qui va stocker tout nos restiko dans airtable
var titleFieldRestiko =[
    "Date",
    "Ce que j'ai fait",
    "Ce que j'ai appris",
    "Ce que j'ai aimé",
    "Ce que j'ai utilisé de nouveaux",
    "Problématiques  rencontrées",
    "Quels sont les objectifs ?",
    "Qu'est-ce qui m'a manqué ?",
    "Qu'est-ce que tu ferais à la place du formateur ?",
    "Objectif atteint?",
    "Note sur 5"
];

getAllRestiko(); // on lance la fonction qui va remplir notre tableau 
  
// à chaque fois que l'on sera sur la page index, on remove tout ce qu'on a stocké dans le localStorage
localStorage.removeItem('number');
localStorage.removeItem('id');


// test si il y a déja un utilisateur de connecter
if(sessionStorage.getItem("user") != null)
{
    // si oui on affiche normalement la page de notre site
    $("#loading").show();
    $("#connection").hide();
    setEverything();
}