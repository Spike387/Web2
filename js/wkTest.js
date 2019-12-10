$(document).ready(function(){
    addItemToWK();
});

$(document).on("click","#remove_im_warenkorb", function(){
    value = $(this).val();
    deleteFromWarenkorb(value,0);
    location.reload();

})

function addItemToWK() {
    var produkte = []
    for (var key in localStorage){
        if (key != "zaehler" && key != "key" && key != "getItem" && key != "setItem" && key != "removeItem" && key != "clear" && key != "length" && key!="Newsletter"){
            produkte.push(key);
        }
    }

    console.log(produkte);
    for (var i=0; i<produkte.length;i++) {
        var warenkorb_value = localStorage.getItem(produkte[i]);
        var aufgeteilt = warenkorb_value.split(";");

        var id = aufgeteilt[0];
        var menge =     aufgeteilt[1];
        var preis = aufgeteilt[2];
        var gesamtpreis = parseFloat(menge) * parseFloat(preis);

        const div = document.createElement('div');

        div.className = 'row'

        div.innerHTML =`
            <li class="list-group-item">
                <div class="warenkorb">
                    <img class="produktbild" src="./img/Banner3.jpg" alt="Produktbild" width="85" height="85">
                    <div class="beschreibung">
                    ${produkte[i]}
                    <p font-size="1">
                        Dies ist eine kurze Beschreibung des Produkts, minimale Informationen
                    </p>
                </div>
                <div class="preis">
                    Preis:
                    <p>
                        ${gesamtpreis}€
                    </p>
                </div>
                <div class="einzelpreis">
                    Produkt-
                    preis:
                    <p>
                        ${preis}€
                    </p>
                </div>
                <div class="menge">
                    Menge:
                    <p>
                        <input class="mengeinput" type="text" name="" value="">
                     </p>
                </div>
                    <button type="button" class="btn btn-primary remove" value="${produkte[i]}" id="remove_im_warenkorb"><i class="fas fa-trash-alt"></i></button>
                </div>
            </li>
        `;

        document.getElementById('123').appendChild(div);
    }
    div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `
        <div class="zusammenfassung col offset-lg-9">
            <div class"col col-lg-12">
                Gesamtpreis:
                <p>Mehrwertsteuer: </p>
                <p>Preis: </p>
            </div>
            <div class="col col-lg-12">
                <button class="btn btn-warning kaufen col col-lg-12" type="button">KAUFEN</button>
            </div>
        </div>
        `;
    documet.getElementById('kaufen-button').appendChild(div);
}   
