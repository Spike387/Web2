
		$(document).ready(function() {
			console.log("Versuche Titel zu laden");
			console.log(window.location.search);
			// extract product id from url
			var para = new URLSearchParams(window.location.search)
			console.log(para.get("id"));
			var prodid = 1;
			prodid = para.get("id");
			var prodpreis = 0;
			var prodbez;

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
  
			$.ajax ({
				url : "http://localhost:8000/api/produkt/gib/" + prodid ,
				method : "get",
				dataType : "json"
			}).done(function(response) {
				console.log(response.daten.bezeichnung);
				console.log(typeof(response.daten.bezeichnung));
				console.log(prodbez);
				prodbez = JSON.parse(JSON.stringify(response.daten));
				$("#getprodukt").text(prodbez.bezeichnung);
				$("#beschreibung").html(response.daten.beschreibung);
				prodpreis = response.daten.nettopreis;
				$("#preis").append(prodpreis + "&#8364;")
			}).fail(function(jqXHR, statusText, error){
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#beschreibung").html("ein Fehler ist aufgetretten");
			});

			$("#bestellen").click( function (){
				toWarenkorb(prodbez.bezeichnung, prodid, '1', prodpreis);
			});
		});
