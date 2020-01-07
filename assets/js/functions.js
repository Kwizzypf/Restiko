function getAllRestiko()
{
    tableRestiko.length = 0;
    base('Table 1').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 50,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            var tab = [
                record.get("Date"),
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

function setListRestiko()
{
    $("#titleTop").show();
    for(var i = 0; i < tableRestiko.length; i ++)
    {
        
        var tmp = listRestiko.replace(/###number###/gi, i+1);
        tmp = tmp.replace("###date###",tableRestiko[i][0]);
        $("#list").append(tmp);
    }
}

function createPagination()
{
    var items = $("#list .items");
            var numItems = items.length;
            var perPage = 8;

            items.slice(perPage).hide();

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
    $("#btnModif").attr("onclick","modifier("+cpt+")");
    
}

function modifier(index)
{
    afficherForm();
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

function modifierRestiko(id)
{
    base('Table 1').update(id, {
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
        "Note sur 5": $("#id-10").val()
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      });
    hideAll();
    setTimeout(function() { 
        document.location.reload(true);
    }, 3000); 
}

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

function createRestiko()
{

    base('Table 1').create({
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
        "Note sur 5": $("#id-10").val()
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      });
    hideAll();
    setTimeout(function() { 
        document.location.reload(true);
    }, 3000); 
}