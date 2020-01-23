//      _____  ____   ____   _____   ___  ______    _____  ____   ____     ____  ____  _____   _   _____             _____ __  __ 
//     |_____ |      |____)    |    |___)   |       |__   |    | |____)    |   ) |__     |    /_\    |   |      |__|   |   | \/ | |
//     _____| |____  |   \   __|__  |       |       |     |____| |   \     |__/  |____   |   /   \ __|__ |___ []|  |   |   |    | |____

if(sessionStorage.getItem("user") == null)
{
    window.location.replace("index.html")
}


var tableRestiko = []; // tableau qui va stocker tout nos restiko de airtable
getAllRestiko();  // on lance la fonction qui va remplir notre tableau 
$("#loading").show(); // affichage de la div de chargement

// après 3 secondes on affiche tout ce dont on a besoin pour faire un affichage d'un restiko et avoir la possibilité de la modifier
setTimeout(function() { 
    $("a").removeClass("disabled");
    $(".mainBar").attr("onclick","afficherMain()");
    $("#loading").hide();
    $("#navBar").show();
    $("#affichage").show();
    var number = localStorage.getItem("number");
    var id = localStorage.getItem("id");
    show(number);
    $("#btnModif").attr("onclick", "setLocal('"+id+"','"+number+"')");
}, 3000); 

