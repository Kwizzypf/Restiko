var tableRestiko = [];
getAllRestiko();
var bool = false;
var id = localStorage.getItem("id");
var index = localStorage.getItem("number");


$("#loading").show();

if(id != null)
{
    bool = true;
}  

setTimeout(function() { 
    $("a").removeClass("disabled");
    $("#loading").hide();
    $("#navBar").show();
    $("#titleMid").show();
    $("#formulaire").show();
    if(bool == true)
    {
        modifier(index);
    }
}, 3000); 

