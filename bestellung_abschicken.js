$(document).on("click","#bestellung_abschicken", function(event){
    //event.preventDefault();
    var objperson = {
        "anrede": document.getElementById("Anrede").value,
        "vorname": document.getElementById("Vorname").value,
        "nachname": document.getElementById("Nachname").value,
        "adresse": {
            "id": 2
        },
        "telefonnummer": "018287382480",
        "email": "bla@lca.com"
    } 
    console.log(objperson);
    var obj = { "anrede": "Herr", "vorname": "petra", "nachname": "Müller", "adresse":{"id":2}, "telefonnummer":"25048074081","email":"petra.m@web.de","geburtstag":"15.10.1980"};
    $.ajax({
            url: "http://localhost:8000/api/person",
            method: "post",
            contentType: "application/json",
            dataType: JSON.stringify(objperson)
        }).done(function(){
            alert("Das hat funktioniert!");
            console.log("Eingetragen");
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
        })    
})