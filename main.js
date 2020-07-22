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
}


function getAlbums() {
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/array/music",
    method: "GET",
    success: function (data, state) {
      var albums = data["response"];

      console.log(albums);
    },
    error: function (request, error, state) {
      console.log("Errore AJAX");
    }
  });
}
