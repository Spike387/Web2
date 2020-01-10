$(document).ready(function(){
    var produkte = []
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length" && key!="Newsletter"){
            produkte.push(key);
            console.log(key);
        }
    }
    for (var loesche in produkte){
        localStorage.removeItem(produkte[loesche]);
    }

    var bestellid = localStorage.getItem("bestellung");
    $.ajax({
        url: "http://localhost:8000/api/bestellung/gib/"+bestellid,
        method: "get",
        dataType: "json"
    }).done(function(response){
        console.log(response.daten); // Hier musst du die Darstellung einfügen
    })

    localStorage.removeItem("bestellung");
})    
 