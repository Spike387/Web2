$(document).ready(function(){
    var produkte = []
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length" && key!="Newsletter"){
            produkte.push(key);
            //console.log(key);
        }
    }
    for (var loesche in produkte){
        localStorage.removeItem(produkte[loesche]);
    }
    
    var bestellid = localStorage.getItem("bestellung");
    var counter = 0;
    $.ajax({
        url: "http://localhost:8000/api/bestellung/gib/"+bestellid,
        method: "get",
        dataType: "json"
    }).done(function(response){
        console.log(response.daten); // Hier musst du die Darstellung einfügen
            for (var i in response.daten.bestellpositionen){
                eintrag = $("<div>");
                eintrag.prop({class : "row m-3 bg-light border border-primary", style:"height:3.5rem"});
                prod_text = $("<p>");
                prod_text.prop("class","col col-md-6 mh-100 overflow-hidden")
                prod_text.html("<b>"+response.daten.bestellpositionen[i].produkt.bezeichnung);
                eintrag.append(prod_text);

                prod_menge = $("<p>");
                prod_menge.prop("class", "col-md-1");
                prod_menge.html('<b>Menge: <br>'+response.daten.bestellpositionen[i].menge);            
                eintrag.append(prod_menge);

                prod_preis = $("<p>");
                prod_preis.prop("class", "col col-md-1");
                prod_preis.html("<b>Preis:</b> <br>" + response.daten.bestellpositionen[i].bruttosumme + "&euro;");
                eintrag.append(prod_preis);

                $("#bestellung").append(eintrag);
            }
            //Gesamtpreis
            
            var gesamtpreis = response.daten.total.brutto
            eintrag = $("<div>");
            eintrag.prop({class : "row m-3 bg-light border border-primary", style:"height:3.5rem"});
            prod_gesamtpreis = $("<p>")
            prod_gesamtpreis.prop("class", "col col-md-1");
            prod_gesamtpreis.html("<b>Gesamtpreis:</b> <br>" + gesamtpreis);
            eintrag.append(prod_gesamtpreis);
            $("#bestellung").append(eintrag);
            
            // Rechnungsadresse
            var br = document.createElement("br");

            rechnungsdiv = $("<div>")
            rechnungsdiv.prop({class : "m-3 bg-light border border-primary", style:"height:12.5rem"});

            anrede = $("<p>");
            anrede.html(response.daten.besteller.anrede);
            rechnungsdiv.append(anrede);

            bestellername = $("<p>");
            bestellername.html(response.daten.besteller.vorname + " " + response.daten.besteller.nachname);
            rechnungsdiv.append(bestellername);

            street = $("<p>");
            street.html(response.daten.besteller.adresse.strasse + " " + response.daten.besteller.adresse.hausnummer);
            rechnungsdiv.append(street);

            plz = $("<p>");
            plz.html(response.daten.besteller.adresse.plz + " " + response.daten.besteller.adresse.ort);
            rechnungsdiv.append(plz);

            email = $("<p>");
            email.html(response.daten.besteller.email);
            rechnungsdiv.append(email);
        

            $("#rechnung").append(rechnungsdiv)

            //Zahlungsart

            zahldiv = $("<div>");
            zahldiv.prop({class : "row m-3 bg-light border border-primary", style:"height:2rem"});
            zahlungsart = $("<p>");
            zahlungsart.html(response.daten.zahlungsart.bezeichnung);
            zahldiv.append(zahlungsart);
            $("#zahlung").append(zahldiv);

    localStorage.removeItem("bestellung");
    }).fail(function(response){
        console.log("Das hat nicht funktioniert!!!");
    });    
});
