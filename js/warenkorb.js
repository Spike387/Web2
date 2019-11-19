function toWarenkorb(name,id,menge){
    warenkorb_key = name;
    warenkorb_value = "";
    if (localStorage.getItem(warenkorb_key) == null){
        warenkorb_value += id + ";" + menge;
    }
    else{
        warenkorb_value = localStorage.getItem(warenkorb_key);
        aufgeteilt = warenkorb_value.split(";");
        warenkorb_id = aufgeteilt[0];
        warenkorb_menge = parseInt(aufgeteilt[1]);
        warenkorb_menge += parseInt(menge);
        console.log("Folgendes wurde zum Warenkorb hinzugefügt: Key: " + warenkorb_key + " und Value: " + warenkorb_value);
        warenkorb_value = warenkorb_id + ";" + warenkorb_menge.toString();

    }
    localStorage.setItem(warenkorb_key,warenkorb_value)

}

function deleteFromWarenkorb(name, zuloeschen){
    warenkorb_key = name;
    warenkorb_menge = zuloeschen;
    warenkorb_value = "";
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