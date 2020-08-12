$(document).ready(function () {
  $("#cuisineSearchBtn").on("click", function (event) {
    event.preventDefault();

    var cuisineName = $("#cuisineSearch").val().trim();

    var qURL =
      "https://developers.zomato.com/api/v2.1/search?city_id=281&q=" +
      cuisineName +
      "&count=10";

    var apiKey = "2250e0cbe30b423e649121eee80563d0";

    $("#cuisineSearch").val(""); //CLEARS INPUT FIELD ONCE SEARCH IS CLICKED

    console.log(cuisineName);

    $.ajax({
      async: true,
      crossDomain: true,
      url: qURL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    })
      // AFTER DATA COMES BACK FROM REQUEST
      .then(function (response) {
        console.log(qURL);

        console.log(response);

        for (var i = 0; i < 10; i++) {}
      });
  });
});

function toggleDropdown() {
  document.querySelector("#filterChoices").classList.toggle("show");
}

// window.onclick = function (event) {
//   console.log("clicked");
//   if (!event.target.matches(".filterBtn")) {
//     toggleDropdown();
//   }
// };
