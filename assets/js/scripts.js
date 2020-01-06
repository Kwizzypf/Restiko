var tableRestiko = [];
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

$("#navBar").show();
getAllRestiko();

setTimeout(function() { 
    $("a").removeClass("disabled");
    $(".mainBar").attr("onclick","afficherMain()");
    $("#loading").hide();
    $("#navBar").show();
    setListRestiko();
    createPagination();
}, 5000); 