$(document).ready(function () {
  $("#cuisineSearch").on("click", function (event) {
    event.preventDefault();
    var cuisineName = $("#userInput").val().trim();
    var qURL =
      "https://developers.zomato.com/api/v2.1/search?count=10&city_id=281&q=" +
      cuisineName;
    var apiKey = "2250e0cbe30b423e649121eee80563d0";
    $("#userInput").val("");
    localStorage.setItem("cuisineInput", JSON.stringify(cuisineName));
    console.log(cuisineName);
    var settings = {
      url: qURL,
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    };
    $.ajax(settings)
      // After data comes back from the request
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
//   if (!event.target.matches(".filterBtn")) {
//     document.querySelector("#filterChoices").classList.remove("show");
//   }
// };

//var queryURL = "https://www.google.com/maps/search/?api=1&query="+ restaurant + "losangeles"
var googleapiKey = "AIzaSyCykU04NtL76bdBse3BGOsVY43OWKXqiAY";

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: { lat: 34.024, lng: -118.496 },
    zoom: 10,
  });
}

function createMap(restaurant) {}
