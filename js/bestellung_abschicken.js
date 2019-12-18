$(document).on("click","#bestellung_abschicken", function(event){
    console.log("Das ist ein Test");
    var objektperson = {"id":1,"anrede":"Frau","vorname":"Tobias","nachname":"Test","adresse":{"id":4},"telefonnummer":"012829342738","email":"Robin@test.com"};
    var objektzahlungsart = {"id":2,"bezeichnung":"Rechnung"};
    var objektprodukt = {"id":1,"kategorie":{},"bezeichnung":"Passwort Schulung","mehrwertsteuer":{},"nettopreis":172};
    var objetktbestellpositionen = {"id": 33,"bestellung": {"id":1},   "produkt": objektprodukt,   "menge": 5,"mehrwertsteuersumme": 17.92,"nettosumme": 210.02,"bruttosumme": 227.94};
    var objektbestellung = {"id":1,"bestellzeitpunkt":"15.10.2019 08:17:44", "besteller":objektperson,"zahlungsart":objektzahlungsart,"bestellpositionen":[objetktbestellpositionen]};
    console.log(objektbestellung);
    $.ajax({
        url: "http://localhost:8000/api/bestellung",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(objektbestellung)
    }).done(function(response){
        console.log(response);
    }).fail(function(jqXHR, statusText, error){
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText + error);
    });
})