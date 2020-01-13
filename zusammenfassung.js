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
    console.log("Hallo")
    var bestellid = localStorage.getItem("bestellung");
    $.ajax({
        url: "http://localhost:8000/api/bestellung/gib/"+bestellid,
        method: "get",
        dataType: "json"
    }).done(function(response){
        console.log(response.daten); // Hier musst du die Darstellung einfügen
        $("#123").empty();
        for (var i = 0; i < response.daten.length; i++) {  
            { 
                eintrag = $("<div>");
                eintrag.prop({class : "row m-3 bg-light border border-primary", style:"height:3.5rem"});
                prod_text = $("<p>");
                prod_text.prop("class","col col-md-6 mh-100 overflow-hidden")
                prod_text.html("<b>"+response.daten[i].bezeichnung);
                eintrag.append(prod_text);

                prod_menge = $("<p>");
                prod_menge.prop("class", "col-md-1");
                prod_menge.html('<b>Menge:'+localStorage.getItem(response.daten[i].bezeichnung).split(";")[1]);            
                eintrag.append(prod_menge);

                prod_preis = $("<p>");
                prod_preis.prop("class", "col col-md-1");
                prod_preis.html("<b>Preis:</b> <br>" + (response.daten[i].bruttopreis*(localStorage.getItem(response.daten[i].bezeichnung).split(";")[1])) + "&euro;");
                eintrag.append(prod_preis);
                //div mit id 123 einfügen
                $("#bestellung").append(eintrag);
            }
        }


    localStorage.removeItem("bestellung");
    });    
});