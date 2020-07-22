// GOAL:
// Attraverso una chiamata ajax all'Api di boolean avremo a
// disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.

// Bonus: Creare una select con i seguenti generi: pop, rock,
// metal e jazz. In base a cosa scegliamo nella select vedremo i
// corrispondenti cd.

// Chiamata:
// https://flynn.boolean.careers/exercises/api/array/music



$(document).ready(init);

function init() {
  getAlbums();

  // BONUS
  addSelectListener();
}


function getAlbums() { // questa funzione fa una richiesta al server e riceve come risposta un array. Ogni elemento dell'array è un oggetto con diverse informazioni su un album musicale. questa informazioni serviranno a compilare una lista di album nella pagina.

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/array/music", // url per la richiesta fornito da boolean
    method: "GET",
    success: function (data, state) { // operazioni da eseguire in caso la richiesta al server vada a buon fine

      var albums = data["response"]; // salvo nella variabile albums parte di risposta che consiste in un array di oggetti.

      console.log(albums);

      albumsInHtml(albums); // passo l'array con le info sugli album ad una funzione che li stamperà in pagina
    },
    error: function (request, error, state) {
      console.log("Errore AJAX");
    }
  });
}


function albumsInHtml(albumsArray) { // funzione che stampa in pagina gli album compilati con le informazioni che arrivano dal server

  var template = $("#template-handlebars").html(); // salvo nella variabile il template in html che gestirò con HANDLEBARS

  var compiled = Handlebars.compile(template); // la variabile conterrà una funzione che sostituisce alle {{ }} nel template i valori delle chiavi corrispondenti nell'oggetto che gli passerò
  var target = $("#cds-container"); // semplicemente il div che conterrà gli album

  for (var i = 0; i < albumsArray.length; i++) { // ciclo su tutta la lunghezza dell'array. albumArray[i] sarà di volta in volta un oggetto contente le info del singolo album
    var newAlbum = compiled(albumsArray[i]); // la funzione creata prima salvandola nella variabile compiled sostiuisce le chiavi nelle graffe del template con i valori delle rispettive chiavi nell'oggetto. ad ogni ciclo cambiando l'oggetto cambieranno i valori delle chiavi
    target.append(newAlbum) // stampo nell'html il template compilato
  }
}


// BONUS

function addSelectListener(){
  $("#genre-select").change(genreFilter); // .change() avvia la funzione quando cambia il valore (value) dell'elemento selezionato in questo caso la select con id="genre-select"
}

function genreFilter(){ // funzione che nasconde o mostra i cd

  var selected = $(this).val(); // value di $(this). dell'elemento su cui si è scatenato l'evento. quindi è il value della select

  var target = $(".cd"); // tutti i div con le info dei cd

  var selectedTarget = $(".cd[data-genre=\"" + selected + "\"]")// selezione di tutti i cd che hanno come data-genre il genere selezionato. La stringa è una selezione avanzata del css per attributo con la variabile selected al posto del valore di data-genre

  if (selected == "tutti"){ // se si seleziona tutti allora mostro tutti i cd
    target.show();
  } else{ // altrimenti nascondo tutti i cd e poi mostro solo quelli con data-genre corrispondente a quello selezionato
    target.hide();
    selectedTarget.show();
  }



}
