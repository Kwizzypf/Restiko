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
        tmp = tmp.replace("###id###",tableRestiko[i][11]);
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

function setLocal(number, id)
{
    console.log(number, id)
    localStorage.setItem("number", number)
    localStorage.setItem("id", id);
}