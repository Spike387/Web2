
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
        console.log("hallo");
        //<ul class="list-group list-unstyled m-3">
            //<li><a class="nav-link active" href="produktseite.html" >Produkt x</a></li>
        ul = $("<ul>");
        ul.prop("class", "list-group list-unstyled m-3");
        for (i = 0; i < response.daten.length; i++) {
          if ((response.daten[i].kategorie.id == prodid) | (prodid == 0) ) 
          {  
            li = $("<li>");
            li.prop({class : ''});
            a = $("<a>");
            a.prop({class : 'nav-link active bg-warning'});
            a.prop('href', "produktseite.html?id=" + response.daten[i].id);
            a.text(response.daten[i].bezeichnung);
            li.html(a);
            ul.append(li);
          }
        }
        $("#produktabelle").html(ul);

			}).fail(function(jqXHR, statusText, error){
				console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
				$("#beschreibung").html("ein Fehler ist aufgetretten");
			});
		});
