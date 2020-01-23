// fonction qui va récupérer tout les données de mes restiko et les stocks dans un tableau
function getAllRestiko()
{
    tableRestiko.length = 0;
    base('RESTIKO').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 100,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            // inversion de la date pour avoir un affichage JJ-MM-AAAA
            var date = record.get("Date");

            // je stock dans un tableau chaque champs de la table airtable
            var tab = [
                date, // index : [0][0]
                record.get("Ce que j'ai fait"), // index : [0][1]
                record.get("Ce que j'ai appris"),// index : [0][2]
                record.get("Ce que j'ai aimé"),// index : [0][3]
                record.get("Ce que j'ai utilisé de nouveaux"),// index : [0][4]
                record.get("Problématiques  rencontrées"),// index : [0][5]
                record.get("Quels sont les objectifs ?"),// index : [0][6]
                record.get("Qu'est-ce qui m'a manqué ?"),// index : [0][7]
                record.get("Qu'est-ce que tu ferais à la place du formateur ?"),// index : [0][8]
                record.get("Objectif atteint?"),// index : [0][9]
                record.get("Note sur 5"),// index : [0][10]
                record.id // index : [0][11]
            ];
            // je stock le tableau dans un autre tableau
            tableRestiko.push(tab);
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

// fonction qui va injecter dans le html la liste des restikos récupérer
function setListRestiko()
{
    //affichage du titre en haut de page
    $("#titleTop").show();
    //boucle pour avoir toutes les données stockés dans notre tableau
    for(var i = 0; i < tableRestiko.length; i ++)
    {
        // je remplaces les marqueurs de mon template.
        var tmp = listRestiko.replace(/###number###/gi, i+1);
        tmp = tmp.replace("###date###",tableRestiko[i][0]);
        tmp = tmp.replace("###id###",tableRestiko[i][11]);
        // j'injectes dans mon html
        $("#list").append(tmp);
    }
}

// fonction qui va créer notre pagination
function createPagination()
{

    var items = $("#list .items"); // stock toute les divs de la liste dans un tableau
            var numItems = items.length; // récupère la taille du tableau
            var perPage = 8; // nombre items à afficher par page

            items.slice(perPage).hide();

            // jquery qui va gérer toute la pagination
            $('.pagination-container').pagination({
                items: numItems,
                itemsOnPage: perPage,
                prevText: "&laquo;",
                nextText: "&raquo;",
                onPageClick: function (pageNumber) {
                    var showFrom = perPage * (pageNumber - 1);
                    var showTo = showFrom + perPage;
                    items.hide().slice(showFrom, showTo).show();
                }
            });
}


//fonction qui va tout cacher
function hideAll()
{
    $("#loading").show();
    $("#titleTop").hide()
    $(".pagination-container").hide();
    $("#formulaire").hide();
    $("#titleMid").hide();
}


function afficherForm()
{
    $("#titleTop").hide()
    $(".pagination-container").hide();
    $("#formulaire").show();
    $("#titleMid").show();
}

function afficherMain()
{
    $("#titleTop").show()
    $(".pagination-container").show();
    $("#formulaire").hide();
    $("#titleMid").hide();
    $("#text").html("Créer");
    $("#saved").html("Sauvegarder");
    $("#saved").attr("onclick", "createRestiko()");
    resetForm();
    $("#loading").hide();

}

function resetForm()
{
    $("#dateID").val("");
    $("#id-1").val("");
    $("#id-2").val("");
    $("#id-3").val("");
    $("#id-4").val("");
    $("#id-5").val("");
    $("#id-6").val("");
    $("#id-7").val("");
    $("#id-8").val("");
    $("#id-9").val("");
    $("#id-10").val("");
}

// fonction qui va enregistrer en locale le nombre et l'id d'un restiko
function setLocal(number, id)
{
    console.log(number, id)
    localStorage.setItem("number", number)
    localStorage.setItem("id", id);
}


//fonction qui va gérer la connexion
function checkIfGood()
{
    // on s'authentifie auprès de l'API airtable pour récupérer notre tableau avec nos comptes
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyKFGV7w853FKD35'}).base('appCmEPx5URcrGLJ2');

    
    base('USERS').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            // stock la donnée dans une variable pour un user dans airtable
            var admin = record.get("user");
            // stock la donnée dans une variable pour un mot de pass dans airtable
            var pwd = record.get("password");
            // stock la donnée dans une variable du champ user du html
            var inputAdmind = $("#userId").val();
            // stock la donnée dans une variable du champ mot de pass du html
            var inputPwd = $("#passId").val();

            // on compare les deux données user et mot de pass
            if(admin == inputAdmind && pwd== inputPwd )
            {
                // si vrai on affiche un petit loading + on cache la div de connexion
                $("#loading").show();
                $("#errorMessage").hide();
                $("#connection").hide();
                // je stock en session storage le user et son mdp
                sessionStorage.setItem("user", admin);
                sessionStorage.setItem("pwd", pwd);

                //on affiche notre site 
                setEverything();
            }
            else
            {
                //sinon on reset les champs user et mot de passe puis on affiche un message d'erreur
                $("#errorMessage").show();
                $("#passId").val("");
                $("#userId").val("");
            }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });


}

// fonction qui permet d'afficher mon site une fois connecter
function setEverything()
{
    setTimeout(function() { 
             $("a").removeClass("disabled");
             $(".mainBar").attr("onclick","afficherMain()");
             $("#loading").hide();
             $("#navBar").show();
             setListRestiko();
             createPagination();
         }, 3000); 
}

// fonction qui nettoie le locale storage et lance un refresh de la page
function clearAll()
{
    localStorage.clear();
    Location.reload()
}