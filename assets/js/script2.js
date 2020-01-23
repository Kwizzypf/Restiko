//      _____  ____   ____   _____   ___  ______    _____  ____   ____      ____  ___   ____   _  _____  ___         _____ __  __ 
//     |_____ |      |____)    |    |___)   |       |__   |    | |____)    |     |___) |__    /_\   |   |_      |__|   |   | \/ | |
//     _____| |____  |   \   __|__  |       |       |     |____| |   \     |____ |   \ |____ /   \  |   |___ [] |  |   |   |    | |____
 
if(sessionStorage.getItem("user") == null)
{
    window.location.replace("index.html")
}

var tableRestiko = []; // tableau qui va stocker tout nos restiko de airtable
getAllRestiko();  // on lance la fonction qui va remplir notre tableau 
var bool = false; // variable qui va nous permettre de savoir si le localstorage est vide ou pas

// récupère les infos stocké dans le local storage
var id = localStorage.getItem("id");
var index = localStorage.getItem("number");



// affiche notre page de chargement
$("#loading").show();

// on tcheck si notre local storage est vide ou pas
if(id != null)
{
    bool = true;
}


//après un délais de 3 sec, j'affiches le formulaire
setTimeout(function() { 
    $("a").removeClass("disabled");
    $("#loading").hide();
    $("#navBar").show();
    $("#titleMid").show();
    $("#formulaire").show();
    if(bool == true)
    {
        modifier(index);
    }
}, 3000); 

