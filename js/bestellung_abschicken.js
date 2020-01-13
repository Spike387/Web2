$(document).ready(function(){
    var produkte = []
    var produkte_bestellung = [];
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length" && key!="Newsletter"){
            produkte.push(key);
        }
    }
    $("#anz_produkte").html(produkte.length);
    const ul = document.createElement('ul');
    ul.className = 'list-group mb-3';
    var gesamtpreis = 0;
    console.log(produkte);
    for (var i=0; i<produkte.length;i++) {
        var warenkorb_value = localStorage.getItem(produkte[i]);
        var aufgeteilt = warenkorb_value.split(";");
        var produktname = "";
        var produktbeschreibung = "";
        var id = aufgeteilt[0];
        var menge =     aufgeteilt[1];
        console.log();
        var preis = aufgeteilt[2];
        gesamtpreis += menge * parseFloat(preis);
        $.ajax({
            url: 'http://localhost:8000/api/produkt/gib/' + id,
            method: 'get',
            dataType: "json"
        }).done(function(response){
            produkte_bestellung.push(response.daten);
            produktname = response.daten.bezeichnung;
            produktbeschreibung = response.daten.details;
            ul.innerHTML += `<li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">${produktname}</h6>
          <small class="text-muted">Menge: ${menge}</small></br>
          <small class="text-muted">${produktbeschreibung}</small>
        </div>
        <span class="text-muted">${preis}€</span>
      </li>`
        }).fail(function(){
            console.log("Das hat nicht funktioniert!");
        })

        
    }
    ul.innerHTML += `<li class="list-group-item d-flex justify-content-between">
    <span>Gesamt (Euro)</span>
    <strong>${gesamtpreis}€</strong>
  </li>`
    $('#anhang_warenkorb').append(ul);
    $("#kaufen_abschicken").click(function(event){
        var varichecked = document.getElementById("frau");
        var anrede = "herr";
        if (varichecked.checked){
            anrede = "frau";
        }
        event.preventDefault();
        var adresse_id;
        var adresse = {"strasse": document.getElementById("strasse_auswahl").value,"hausnummer": document.getElementById("hausnummer_auswahl").value, "plz": document.getElementById("plz_auswahl").value, "ort": document.getElementById("stadt_auswahl").value, "adresszusatz": document.getElementById("adresse2_auswahl").value,"land":{"id":44,"kennzeichnung":"DE","bezeichnung":"Deutschland"}}
        
    $.ajax({
        url: "http://localhost:8000/api/adresse",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(adresse)
    }).done(function(response){
        adresse_id = response.daten.id;
        var person = {"anrede":anrede,"vorname":document.getElementById("vorname_auswahl").value,"nachname":document.getElementById("nachname_auswahl").value,"adresse":{"id":adresse_id}, "email":document.getElementById("email_auswahl").value}
    
        $.ajax({
            url: "http://localhost:8000/api/person",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(person)
        }).done(function(response){
            var person_id = response.daten.id;
            var zahlungsart = 3;
            var zahlungsart_rechnung = document.getElementById("rechnung");
            var zahlungsart_vorkasse = document.getElementById("vorkasse");
            if (zahlungsart_rechnung.checked || zahlungsart_vorkasse.checked){
                if (zahlungsart_rechnung.checked){
                zahlungsart = 4;
                }
            }else{
                alert("Bitte wählen Sie eine Zahlungsart aus!");
            }
            var bestellpositionen = [];
            for (var zaehler = 0; zaehler<produkte_bestellung.length;zaehler++){
                var dummy = localStorage.getItem(produkte_bestellung[zaehler].bezeichnung);
                var dummy_split = dummy.split(";");
                var position = {"id":0,"produkt":produkte_bestellung[zaehler],"menge":dummy_split[1]};
                bestellpositionen.push(position);
            }
            var bestellung = {
                "besteller": {
                    "id":person_id
                }, 
                "zahlungsart": { 
                    "id":zahlungsart
                },   
                "bestellpositionen": bestellpositionen
            };
            $.ajax({
                url: "http://localhost:8000/api/bestellung",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(bestellung)
            }).done(function(response){
                console.log("Die Bestellung wurde erfolgreich angelegt!");
                localStorage.setItem("bestellung",response.daten.id);
                mailSenden(person.vorname,person.nachname,person.email);
                window.location.replace("./zusammenfassung.html");
            }).fail(function(jqXHR, statusText, error){
                console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText + error);
            });
        }).fail(function(jqXHR, statusText, error){
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText + error);
        });
        
    }).fail(function(jqXHR, statusText, error){
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText + error);
    });
    
    })
    
})

function mailSenden(vorname,nachname,email){
    var zusammensetzung = vorname + nachname;
    var mailobjekt = {"name":zusammensetzung,"email":email,"nachricht":"Sie haben eine neue Bestellung"}
    $.ajax({
        url: "http://localhost:8000/api/mail",
        method: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(mailobjekt)
    }).done(function(){
        console.log("Mail wurde versendet!");
    }).fail(function(error){
        console.log("das tut nicht: " + error);
        console.log(error);
    });
}