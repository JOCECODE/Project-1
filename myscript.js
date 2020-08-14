var localStorage = JSON.parse(localStorage.getItem("response"));
$(document).ready(function () {
  $("#cuisineSearch").on("click", function (event) {
    event.preventDefault();
    var cuisineName = $("#userInput").val().trim();
    var qURL =
      "https://developers.zomato.com/api/v2.1/search?count=10&city_id=281&q=" +
      cuisineName;
    var apiKey = "2250e0cbe30b423e649121eee80563d0";
    $("#userInput").val("");
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
        localStorage.setItem("response", JSON.stringify(response));
        window.location.href = "index2.html";

        // var food = response.restaurants[0].restaurant.name;
      });
  });
});

function renderItems() {
  var local = JSON.parse(localStorage.getItem("response"));

  for (var i = 0; i < local.restaurants.length; i++) {
    var restName = local.restaurants[i].restaurant.name;
    var cuisineType = local.restaurants[i].restaurant.cuisines;
    var location = local.restaurants[i].restaurant.address;
    var phoneNumber = local.restaurants[i].restaurant.phone_numbers;
    var divEl = $("<h4>");
    divEl.attr("data-rest", JSON.stringify("restName" + i));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "location" }).text(location).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem(
      "restName" + [i],
      JSON.stringify(local.restaurants[i])
    );
  }
  // ONCLICK TO PAGE 3
  $("h4").on("click", function () {
    var t = $(this).attr("data-rest");
    var newLocal = JSON.parse(localStorage.getItem(t));
    console.log(t);
    $(".restResults").text(newLocal);
    console.log(newlocal);
    window.location.href = "index3.html";
  });
}
renderItems();

// FILTER BUTTON
function toggleDropdown() {
  document.querySelector("#filterChoices").classList.toggle("show");
}

// window.onclick = function outsideClick(event) {
//   if (!event.target.matches(".filterBtn") ) {
//     document.querySelector("#filterChoices").classList.hide("show");
//   }
// };
var googleapiKey = "AIzaSyCykU04NtL76bdBse3BGOsVY43OWKXqiAY";

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: { lat: 34.024, lng: -118.496 },
    zoom: 10,
  });
}

function createMap(restaurant) {}
