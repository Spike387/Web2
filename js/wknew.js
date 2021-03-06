$(document).ready(function(){
    loadWarenkorbListe();
    console.log("wird im ready aufgerufen");
    
});


$(document).on("click","#remove_im_warenkorb", function () {
    value = $(this).prop("name");
    console.log("call remove function");
    console.log("entferne: " + value);
    deleteFromWarenkorb(value,0);
    // Warenkorbliste neu laden
    loadWarenkorb();
    loadWarenkorbListe();
});
$(document).on("click","#menge_im_warenkorb", function () {
    value = $(this).prop("name");
    menge = document.getElementById(value).value;
    console.log("call menge function");
    console.log("entferne: " + value);
    //deleteFromWarenkorb(value,0);
    toWarenkorb(value,1,menge);
    // Warenkorbliste neu laden
    loadWarenkorb();
    loadWarenkorbListe();
});
  

function loadWarenkorbListe() {
    console.log("lodadware");
    var produkte = []
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length" && key!="Newsletter"){
            produkte.push(key);
        }
    }
    var gesamtpreis = 0;
    $.ajax ({
        url : "http://localhost:8000/api/produkt/alle",
        method : "get",
        dataType : "json"
    }).done(function(response) {
        console.log(response);
        $("#123").empty();
        for (var i = 0; i < response.daten.length; i++) {
            console.log(produkte != "")
            if (produkte.includes(response.daten[i].bezeichnung) && produkte != "")  
            { 
                gesamtpreis += (response.daten[i].bruttopreis * localStorage.getItem(response.daten[i].bezeichnung).split(";")[1]);
                eintrag = $("<div>");
                eintrag.prop({class : "row m-3 bg-light border border-primary", style:"height:7.5rem"});
                prod_bild = $("<img>");
                prod_bild.prop({class : "col mh-100 col-md-2", src : response.daten[i].bilder[0].bildpfad, alt : "Produktbild"});
                eintrag.html(prod_bild);
                prod_text = $("<p>");
                prod_text.prop("class","col col-md-6 mh-100 overflow-hidden")
                prod_text.html("<b>"+response.daten[i].bezeichnung +"</b><br>"+response.daten[i].beschreibung);

                eintrag.append(prod_text);
                prod_menge = $("<p>");
                prod_menge.prop("class", "col-md-1");
                prod_menge.html('<b>Menge:</b><br><input class="mengeinput" id="'+response.daten[i].bezeichnung+'" type="text" name="" value='+localStorage.getItem(response.daten[i].bezeichnung).split(";")[1]+'><br>');
                eintrag.append(prod_menge);
                prod_preis = $("<p>");
                prod_preis.prop("class", "col col-md-1");
                prod_preis.html("<b>Preis:</b> <br>" + (response.daten[i].bruttopreis *localStorage.getItem(response.daten[i].bezeichnung).split(";")[1]) + "&euro;");
                div_zusatz = $("<div>");
                div_zusatz.prop({class:"col"})
                menge_btn = $("<button>");
                menge_btn.prop({class:"btn btn-primary remove", type: "button", id:"menge_im_warenkorb", name:response.daten[i].bezeichnung});
                menge_btn.html('<i class="fas fa-sync-alt fa-spin"></i>');
                remove_btn = $("<button>");
                remove_btn.prop({class:"btn btn-primary remove", type: "button", id:"remove_im_warenkorb", name:response.daten[i].bezeichnung});
                remove_btn.html('<i class="fas fa fa-trash-alt"></i>');
                div_zusatz.append(menge_btn);
                div_zusatz.append(remove_btn);
                eintrag.append(div_zusatz);
                eintrag.append(prod_preis);
                //div mit id 123 einfügen
                $("#123").append(eintrag);
            }
        }
  div_kauf = document.createElement('div');
    div_kauf.className = 'row';
    div_kauf.innerHTML = `
        <div class="zusammenfassung col offset-lg-9">
            <div class"col col-lg-12">
                <table>
                    <tr> 
                    <th>Preis ohne MwSt.:</th><td class="text-right">${((gesamtpreis/119)*100).toFixed(2)}€</td>
                    </tr>
                    <tr>
                    <th>Mehrwertsteuer:</th><td class="text-right">${((gesamtpreis/119)*19).toFixed(2)}€</td>
                    </tr>
                    <tr><hr class="hr"></tr>
                    <tr>    
                    <th>Gesamtpreis:</th><td class="text-right">${gesamtpreis.toFixed(2)}€</td>
                    </tr>    
                </table>
            </div>
            <div class="col col-lg-12">
                <a href="bestellbestaetigung.html">
                    <button class="btn btn-warning kaufen col col-lg-12" type="button">Bestellung fortsetzen</button>
                </a>
            </div>
        </div>
        `;
    $("#kaufen-button").empty();
    if (produkte != ""){    document.getElementById('kaufen-button').appendChild(div_kauf);}
    else {$("#123").html("<h2>Keine Produkte im Warenkorb</h2>")}
}).fail(function () {
    console.log("could not retrive products");
  });
}