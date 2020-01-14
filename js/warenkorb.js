function toWarenkorb(name,id,menge,preis){
    var warenkorb_key = name;
    var warenkorb_value = "";
    if (localStorage.getItem(warenkorb_key) == null){
        warenkorb_value += id + ";" + menge + ";" + preis;
    }
    else{
        warenkorb_value = localStorage.getItem(warenkorb_key);
        var aufgeteilt = warenkorb_value.split(";");
        var warenkorb_id = aufgeteilt[0];
        var warenkorb_menge = parseInt(aufgeteilt[1]);
        if (parseInt(id) == 1)
        {
            warenkorb_menge = parseInt(menge);
        }
        else
        {
            warenkorb_menge += parseInt(menge);
        }
        warenkorb_value = warenkorb_id + ";" + warenkorb_menge.toString() + ";" + aufgeteilt[2];

    }
    localStorage.setItem(warenkorb_key,warenkorb_value)

}

function deleteFromWarenkorb(name, zuloeschen){
    var warenkorb_key = name;
    var warenkorb_menge = zuloeschen;
    var warenkorb_value = "";
    var zielwert;
    if ( (warenkorb_value = localStorage.getItem(warenkorb_key)) != null){
        if (zuloeschen == 0){
            localStorage.removeItem(warenkorb_key);
        }else{
            aufgeteilt = warenkorb_value.split(";");
            warenkorb_menge = parseInt(aufgeteilt[1]);
            if ((zielwert = warenkorb_menge - zuloeschen) <= 0){
                localStorage.removeItem(warenkorb_key);
            }
            warenkorb_value = aufgeteilt[0] + zielwert.toString();
            localStorage.setItem(warenkorb_key,warenkorb_value);
        }
    }
}