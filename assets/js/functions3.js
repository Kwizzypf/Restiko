
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
            var date = record.get("Date");
            date = date.split('-');
            date = date.reverse();
            date = date.join('-');
            var tab = [
                date,
                record.get("Ce que j'ai fait"),
                record.get("Ce que j'ai appris"),
                record.get("Ce que j'ai aimé"),
                record.get("Ce que j'ai utilisé de nouveaux"),
                record.get("Problématiques  rencontrées"),
                record.get("Quels sont les objectifs ?"),
                record.get("Qu'est-ce qui m'a manqué ?"),
                record.get("Qu'est-ce que tu ferais à la place du formateur ?"),
                record.get("Objectif atteint?"),
                record.get("Note sur 5"),
                record.id
            ];
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

function clearLocal()
{
    localStorage.removeItem('number');
    localStorage.removeItem('id');
    window.location.replace("index.html");

}

function setLocal(id, number)
{
    setTimeout(function() 
    { 
      window.location.replace("create.html")
    }, 1000);  
    localStorage.setItem("id", id);
    localStorage.setItem("number", number);
}