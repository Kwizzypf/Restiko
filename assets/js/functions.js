function getAllRestiko()
{
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
                record.get("Note sur 5")
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
    console.log(tableRestiko[cpt][2])
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