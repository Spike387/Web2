$(document).ready(function(){
    var produkte = []
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length" && key!="Newsletter"){
            produkte.push(key);
            console.log(key);
        }
    }
    //for (var loesche in produkte){
        //localStorage.removeItem(produkte[loesche]);
    //}
    console.log("Hallo")
    var bestellid = localStorage.getItem("bestellung");
    var gesamtpreis;
    $.ajax({
        url: "http://localhost:8000/api/bestellung/gib/"+bestellid,
        method: "get",
        dataType: "json"
    }).done(function(response){
        console.log(response.daten); // Hier musst du die Darstellung einfügen
        $("#anhang_zusammenfassung").empty();
            console.log("Hallo2")
            for (var i in response.daten.bestellpositionen){
                gesamtpreis += response.daten.bestellpositionen[i].bruttosumme;
                eintrag = $("<div>");
                eintrag.prop({class : "row m-3 bg-light border border-primary", style:"height:7.5rem"});
                prod_text = $("<p>");
                prod_text.prop("class","col col-md-6 mh-100 overflow-hidden")
                prod_text.html("<b>"+response.daten.bestellpositionen[i].produkt.bezeichnung);
                eintrag.append(prod_text);

                prod_menge = $("<p>");
                prod_menge.prop("class", "col-md-1");
                console.log(response.daten.bestellpositionen[i]);
                prod_menge.html('<b>Menge:'+response.daten.bestellpositionen[i].menge);            
                eintrag.append(prod_menge);

                prod_preis = $("<p>");
                prod_preis.prop("class", "col col-md-1");
                prod_preis.html("<b>Preis:</b> <br>" + response.daten.bestellpositionen[i].bruttosumme + "&euro;");
                eintrag.append(prod_preis);
                //div mit id 123 einfügen
                $("#anhang_zusammenfassung").append(eintrag);
            }
            
    //localStorage.removeItem("bestellung");
    }).fail(function(response){
        console.log("Das hat nicht funktioniert!!!");
    });    
});