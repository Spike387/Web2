$.ajax({
// Ohne Gesamt Aufruf funktionieren andere Aufrufe nicht!!! 
    url: "http:localhost:8000/api/produkt/alle",
    method: "get"
});
$(document).ready(function(){
    loadWarenkorb();
    $("#1").click(function(){
        $.ajax({
            url: "http://localhost:8000/api/produkt/gib/" + this.id,
            method: "get",
            dataType: "json"
        }).done(function(response){
            toWarenkorb(response.daten.bezeichnung, response.daten.id, "1",response.daten.bruttopreis);
            loadWarenkorb();
            alert("Artikel erfolgreich zum Warenkorb hinzugefügt!");
        })
     })

    $("#2").click(function(){
        $.ajax({
            url: "http://localhost:8000/api/produkt/gib/" + this.id,
            method: "get",
            dataType: "json"
        }).done(function(response){
            toWarenkorb(response.daten.bezeichnung, response.daten.id, "1",response.daten.bruttopreis);
            loadWarenkorb();
            alert("Artikel erfolgreich zum Warenkorb hinzugefügt!");
        })
    })
    $.ajax({
        url: "http://localhost:8000/api/produkt/gib/1",
        method: "get",
        dataType: "json"
    }).done(function (response) {
        $("#produkt1_name").html(response.daten.bezeichnung);
        $("#produkt1_text").html(response.daten.beschreibung);
        $("#produkt1_preis").html(response.daten.bruttopreis + "€ inkl. MwSt.");
        $("#produkt1").attr("src",response.daten.bilder[0].bildpfad);
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });

    $.ajax({
        url: "http://localhost:8000/api/produkt/gib/2",
        method: "get",
        dataType: "json"
    }).done(function (response) {
        $("#produkt2_name").html(response.daten.bezeichnung);
        $("#produkt2_text").html(response.daten.beschreibung);
        $("#produkt2").attr("src",response.daten.bilder[0].bildpfad);
        $("#produkt2_preis").html(response.daten.bruttopreis + "€ inkl. MwSt.");
    }).fail(function (jqXHR, statusText, error) {
        console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
    });
});

$(document).on("click","#warenkorb_anzeige_remove", function(){
    value = $(this).val();
    deleteFromWarenkorb(value,0);
    loadWarenkorb();
})

$(document).on("click","#newsletter_anmeldung", function(event){
    event.preventDefault();
    var newsletter_anmeldung = localStorage.getItem("Newsletter");
    if (newsletter_anmeldung == "Ja"){
        alert("Sie sind schon angemeldet!")
    }else{
        var inhalt = $("#newsletter_anmeldung_text").val();

        if (inhalt == ""){
            alert("Bitte geben Sie eine E-Mail Adresse an!");
        }else{
            localStorage.setItem("Newsletter","Ja");
            alert("Sie haben sich erfolgreich für den Newsletter registriert!");
        }  
    }  
})

function produkteImWarenkorb(){
    var produkte = []
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length" && key!="Newsletter"){
            produkte.push(key);
        }
    }
    return produkte
}

// Warenkorb Anzeige im Header
function loadWarenkorb(){
    produkte = produkteImWarenkorb();
    var content = '';
    var preis_gesamt = 0;
    if (produkte.length > 0){
        for (var i=0;i<produkte.length;i++){
            var value = localStorage.getItem(produkte[i]);
            var geteilt = value.split(";");
            var menge = geteilt[1];
            var preis = parseFloat(geteilt[2]) * parseFloat(menge);
            preis_gesamt += preis;
            preis = preis.toString();
            content += menge + 'x ' + produkte[i] + '<br/>' + preis + '€' + '<button type="button" class="close" id="warenkorb_anzeige_remove" aria-label="Close" value="'+ produkte[i] +'"><span aria-hidden="true">&times;</span></button>' + '<hr class="hr">';
        }
        content += 'Gesamt: ' + preis_gesamt + '€'; 
        
    }else{
        content += 'Ihr Warenkorb ist leer';
    }
    $("#warenkorb_anzeige_produkte").html(content);
}
