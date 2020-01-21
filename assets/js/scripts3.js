var tableRestiko = [];
getAllRestiko();
$("#loading").show();

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

