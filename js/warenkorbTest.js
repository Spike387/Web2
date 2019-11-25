function addRow() {
    for (var i=0; i < localStorage.length; i++) {

        var warenkorb_value = localStorage.getItem(i);
        var aufgeteilt = warenkorb_value.split(";");

        var id = aufgeteilt[0];
        var menge = aufgeteilt[1];
        var preis = aufgeteilt[2];
        var gesamtpreis = parseInt(menge) * parseInt(preis);

        const div = document.createElement('div');

        div.className = 'row'

        div.innerHTML =`
            <li class="list-group-item">
                <div class="warenkorb">
                    <img class="produktbild" src="web2.jpg" alt="W3Schools.com" width="85" height="85">
                    <div class="beschreibung">
                        Produktname:
                    <p font-size="1">
                        Dies ist eine kurze Beschreibung des Produkts, minimale Informationen
                    </p>
                </div>
                <div class="preis">
                    Preis:
                    <p>
                        ${gesamtpreis}
                    </p>
                </div>
                <div class="einzelpreis">
                    Produkt-
                    preis:
                    <p>
                        ${preis}
                    </p>
                </div>
                <div class="menge">
                    Menge:
                    <p>
                        <input class="mengeinput" type="text" name="" value="">
                     </p>
                </div>
                    <button type="button" class="btn btn-primary remove"><i class="fas fa-trash-alt"></i></button>
                </div>
            </li>
        `;

        document.getElementById('123').appendChild(div);
    }
}   