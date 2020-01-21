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
            date = date.split('-');
            date = date.reverse();
            date = date.join('-');
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

// fonction qui va injecter dans le html les infos dans notre tableau pour un index donné
function modifier(index)
{   
    index = index - 1;
    $("#text").html("Modification");
    var dateR = tableRestiko[index][0];
    $("#dateID").val(dateR);
    $("#id-1").val(tableRestiko[index][1]);
    $("#id-2").val(tableRestiko[index][2]);
    $("#id-3").val(tableRestiko[index][3]);
    $("#id-4").val(tableRestiko[index][4]);
    $("#id-5").val(tableRestiko[index][5]);
    $("#id-6").val(tableRestiko[index][6]);
    $("#id-7").val(tableRestiko[index][7]);
    $("#id-8").val(tableRestiko[index][8]);
    $("#id-9").val(tableRestiko[index][9]);
    $("#id-10").val(tableRestiko[index][10]);
    $("#saved").html("Modifier");
    $("#saved").attr("onclick", "modifierRestiko('"+tableRestiko[index][11]+"')");
}

//fonction qui va update sur airtable les infos dans chaque champs
function modifierRestiko(id)
{

    base('RESTIKO').update(id, {
        "Date": $("#dateID").val(),
        "Ce que j'ai fait": $("#id-1").val(),
        "Ce que j'ai appris": $("#id-2").val(),
        "Ce que j'ai aimé": $("#id-3").val(),
        "Ce que j'ai utilisé de nouveaux": $("#id-4").val(),
        "Problématiques  rencontrées": $("#id-5").val(),
        "Quels sont les objectifs ?": $("#id-6").val(),
        "Qu'est-ce qui m'a manqué ?": $("#id-7").val(),
        "Qu'est-ce que tu ferais à la place du formateur ?": $("#id-8").val(),
        "Objectif atteint?": $("#id-9").val(),
        "Note sur 5": $("#id-10").val(),
        "Personne (Initiales)": {
            "id": "usriJxrWKukdtQdlg",
            "email": "faatauira.barry@gmail.com",
            "name": "FAATAUIRA Heifara"
          }
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      });

      alert("Changement effectué!")
      setTimeout(function() 
      { 
        window.location.replace("detail.html")
      }, 1000);  
      
}


// fonction qui va créer un restiko dans airtable
function createRestiko()
{
    base('RESTIKO').create({
        "Date": $("#dateID").val(),
        "Ce que j'ai fait": $("#id-1").val(),
        "Ce que j'ai appris": $("#id-2").val(),
        "Ce que j'ai aimé": $("#id-3").val(),
        "Ce que j'ai utilisé de nouveaux": $("#id-4").val(),
        "Problématiques  rencontrées": $("#id-5").val(),
        "Quels sont les objectifs ?": $("#id-6").val(),
        "Qu'est-ce qui m'a manqué ?": $("#id-7").val(),
        "Qu'est-ce que tu ferais à la place du formateur ?": $("#id-8").val(),
        "Objectif atteint?": $("#id-9").val(),
        "Note sur 5": $("#id-10").val(),
        "Personne (Initiales)": {
            "id": "usriJxrWKukdtQdlg",
            "email": "faatauira.barry@gmail.com",
            "name": "FAATAUIRA Heifara"
          },
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      });
    alert("Création réussit");
    setTimeout(function() { 
      window.location.replace("index.html");
    }, 500); 
}

// fonction qui va clear les infos dans le locale storage et renvoie sur la page index.html
function clearLocal()
{
    localStorage.removeItem('number');
    localStorage.removeItem('id');
    window.location.replace("index.html");
  
}