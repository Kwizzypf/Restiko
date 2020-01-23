//fonction qui va afficher dans notre html les informations stocké dans notre tableau pour un index donnée
function show(index)
{   
    var cpt = index - 1;
    $(".modal-title").html("Restiko "+index);
    $("#date").html(tableRestiko[cpt][0])
    $("#i-1").html(tableRestiko[cpt][1]);
    $("#i-2").html(tableRestiko[cpt][2]);
    $("#i-3").html(tableRestiko[cpt][3]);
    $("#i-4").html(tableRestiko[cpt][4]);
    $("#i-5").html(tableRestiko[cpt][5]);
    $("#i-6").html(tableRestiko[cpt][6]);
    $("#i-7").html(tableRestiko[cpt][7]);
    $("#i-8").html(tableRestiko[cpt][8]);
    $("#i-9").html(tableRestiko[cpt][9]);
    $("#i-10").html(tableRestiko[cpt][10]);
    
}

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

// fonction qui va clear les infos dans le locale storage et renvoie sur la page index.html
function clearLocal()
{
    localStorage.removeItem('number');
    localStorage.removeItem('id');
    window.location.replace("index.html");

}

// fonction qui va enregistrer les infos dans le locale storage puis attends une secondes avant de 
// rediriger l'utilisateur sur la page create.html
function setLocal(id, number)
{
    setTimeout(function() 
    { 
      window.location.replace("create.html")
    }, 1000);  
    localStorage.setItem("id", id);
    localStorage.setItem("number", number);
}