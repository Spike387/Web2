
$(document).ready(function() {
	console.log("Versuche Titel zu laden");
	console.log(window.location.search);
	// extract product id from url
	var para = new URLSearchParams(window.location.search)
	console.log(para.get("id"));
	prodid = para.get("id");

	$.ajax ({
		url : "http://localhost:8000/api/produktkategorie/alle",
		method : "get",
		dataType : "json"
	}).done(function(response) {
		console.log(response.daten);
		// Alle Kategorien in seitenav eintragen
		// ul Liste wird angelegt
		var ul = $("<ul>");
		// class property
		ul.prop("class", "nav list-unstyled col-sm-12 p-2");
		ul.append('<li class="container-fluid text-center"><h4 class="p-3">Kategorien</h4></li>');

		for (i = 0; i < response.daten.length; i++) {
			li = $("<li>");
  if (prodid == response.daten[i].id)
  {
    li.prop("class","container-fluid m-2 p-2 bg-primary");
  }
  else 
  {
    li.prop("class","container-fluid m-2 p-2 bg-secondary");
  }
			a = $("<a>");
			a.text(response.daten[i].bezeichnung);
			a.prop("class", "nav-link active text-light");
			a.prop("href", "produktliste.html?id=" + response.daten[i].id); 
			li.html(a);
			ul.append(li);
		}
		$("#seitenav").html(ul);
		console.log(window.location.search);
		var para = new URLSearchParams(window.location.search)
		console.log(para.get("id"));
	}).fail(function(jqXHR, statusText, error){
		console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
		$("#beschreibung").html("ein Fehler ist aufgetretten");
		}); 


// Abfrage für liste an Produkten
	$.ajax ({
		url : "http://localhost:8000/api/produkt/alle",
		method : "get",
		dataType : "json"
	}).done(function(response) {
		console.log(response.daten);
		for (i = 0; i < response.daten.length; i++) {
		  if ((response.daten[i].kategorie.id == prodid)) 
		  {  

		    eintrag = $("<div>");
		    eintrag.prop({class : "row m-3 bg-light border border-primary", style:"height:7.5rem", href:"produktseite.html?id="+response.daten[i].id, id:"eintrag"});
		    prod_bild = $("<img>");
		    prod_bild.prop({class : "col mh-100 col-md-2", src : response.daten[i].bilder[0].bildpfad, alt : "Produktbild"});
		    eintrag.html(prod_bild);
		    prod_text = $("<p>");
		    prod_text.prop("class","col col-md-7 mh-100 overflow-hidden")
		    prod_text.html("<b>"+response.daten[i].bezeichnung +"</b><br>"+response.daten[i].beschreibung);
		    eintrag.append(prod_text);
		    prod_preis = $("<p>");
		    prod_preis.prop("class", "col col-md-2");
		    prod_preis.html("<b>Preis:</b> <br>" + response.daten[i].bruttopreis + "&euro;");
		    eintrag.append(prod_preis);
		    link = $("<a>");
		    link.prop("href","produktseite.html?id="+response.daten[i].id);
		    link.html(eintrag);
		    $("#produktabelle").append(link);
		  }
		  else if (prodid == 0 | prodid == null) {
		  	$("#produktabelle").html("<p> <h3>Bitte wählen Sie eine Kategorie</h3></p>");
		  }
		}
		}).fail(function(jqXHR, statusText, error){
			console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
			$("#beschreibung").html("ein Fehler ist aufgetretten");
		});
	});


$("#eintrag").click(function(){
	console.log("click drauf");
	window.location = $("#this").attr("href");
});