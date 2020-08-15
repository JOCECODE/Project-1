var localStorage = JSON.parse(localStorage.getItem("response"));
$(document).ready(function (event) {
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
       // ONCLICK TO PAGE 3
 
  });
  $("h4").on("click", function () {
    var t = $(this).data();
    // var name = t.rest.restName;
    var restObj = {
      name: t.rest.restName,
      hours: t.rest.times,
    }
    localStorage.setItem("thisRestObj", JSON.stringify(restObj));
    console.log(restObj);
    window.location.href = "index3.html";

 //  var temp = document.querySelector("#restRest")
  //  temp.textContent = "hoaishdfoijd";
 
  });
});

function renderThisRestObj(){
var thisRestObj = JSON.parse(localStorage.getItem("thisRestObj"));
$(".restResults").text(thisRestObj.name);
$(".hours").text(thisRestObj.hours);
}

function renderItems() {
  var local = JSON.parse(localStorage.getItem("response"));

  for (var i = 0; i < local.restaurants.length; i++) {
    var restName = local.restaurants[i].restaurant.name;
    var cuisineType = local.restaurants[i].restaurant.cuisines;
    var address = local.restaurants[i].restaurant.location.address;
    var phoneNumber = local.restaurants[i].restaurant.phone_numbers;
    var times = local.restaurants[i].restaurant.timings
    var long = local.restaurants[i].restaurant.location.longitude
    var lat = local.restaurants[i].restaurant.location.latitude
    var all = new Object();
    all.restName = restName;
    all.cuisineType = cuisineType;
    all.address = address;
    all.phoneNumber = phoneNumber;
    all.times = times;
    all.long = long;
    all.lat = lat;
    console.log(all)
    var divEl = $("<h4>");
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem(
      "restName" + [i], JSON.stringify(all)
    );
  }
 
}
renderItems();
renderThisRestObj();

// FILTER BUTTON
function toggleDropdown() {
  document.querySelector("#filterChoices").classList.toggle("show");
}

// DROPDOWN MENU CLOSES ON OUTSIDE CLICK
$(window).click(function outsideClick(event) {
  event.stopPropagation();
  if (!event.target.matches(".filterBtn") ) {
    document.querySelector("#filterChoices").classList.remove("show");
  }
});

var googleapiKey = "AIzaSyCykU04NtL76bdBse3BGOsVY43OWKXqiAY";

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: { lat: 34.024, lng: -118.496 },
    zoom: 10,
  });
}

function createMap(restaurant) {}
