$(document).ready(function(){
    loadWarenkorb();
    $("#1").click(function(){
        toWarenkorb("Sicherheitsanalyse - Grob", "2", "1","429.99");
        loadWarenkorb();
        console.log("Es wurde eine Sicherheitsanalyse - Grob zum Warenkorb hinzugefügt und die Anzeige akutalisiert!");
    })

    $("#2").click(function(){
        toWarenkorb("Voluminöse Tasse", "1", "1","19.99");
        loadWarenkorb();
        console.log("Es wurde eine voluminöse Tasse zum Warenkorb hinzugefügt und die Anzeige akutalisiert!");
    })
});


// Warenkorb Anzeige im Header
function loadWarenkorb(){
    var produkte = []
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length"){
            produkte.push(key);
        }
    }
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
            content += menge + 'x ' + produkte[i] + '<br/>' + preis + '€' + '<hr class="hr">';
        }
        content += 'Gesamt: ' + preis_gesamt + '€'; 
        $("#warenkorb_anzeige_produkte").html(content);
    }
}