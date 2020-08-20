// GLOBAL VARIABLES
var localStorage = JSON.parse(localStorage.getItem("response"));

// DISABLE ENTER BUTTON FOR FORM
$(document).ready(function () {
  $("#form1").bind("keypress", function (e) {
    if (e.keyCode == 13) {
      return false;
    }
  });
});

// AJAX CALL WHEN DOCUMENT IS READY
$(document).ready(function (event) {
  $("#cuisineSearch").on("click", function (event) {
    event.preventDefault();
    var cuisineName = $("#userInput").val().trim().toLowerCase();
    var cuisineType = [
      "afghan",
      "african",
      "american",
      "argentine",
      "armenian",
      "asian",
      "australian",
      "austrian",
      "bbq",
      "bagels",
      "bakery",
      "bar food",
      "belgian",
      "beverages",
      "brazilian",
      "breakfast",
      "british",
      "bubble tea",
      "burger",
      "cafe",
      "cajun",
      "california",
      "cambodian",
      "canadian",
      "caribbean",
      "chinese",
      "coffee and tea",
      "colombian",
      "creole",
      "crepes",
      "cuban",
      "deli",
      "desserts",
      "dim sum",
      "diner",
      "donuts",
      "drinks only",
      "eastern european",
      "ethiopian",
      "european",
      "fast food",
      "filipino",
      "fish and chips",
      "french",
      "frozen yogurt",
      "fusion",
      "german",
      "greek",
      "grill",
      "hawaiian",
      "healthy food",
      "ice cream",
      "indian",
      "indonesian",
      "international",
      "iranian",
      "irish",
      "israeli",
      "italian",
      "jamaican",
      "japanese",
      "jewish",
      "juices",
      "korean",
      "latin american",
      "lebanese",
      "malaysian",
      "mediterranean",
      "mexican",
      "middle eastern",
      "moroccan",
      "new american",
      "new mexican",
      "pacific northwest",
      "pakistani",
      "peruvian",
      "pizza",
      "po'boys",
      "portuguese",
      "pub food",
      "puerto rican",
      "ramen",
      "roast chicken",
      "russian",
      "salad",
      "salvadorean",
      "sandwich",
      "scandinavian",
      "seafood",
      "soul food",
      "south american",
      "southern",
      "southwestern",
      "spanish",
      "sri lankan",
      "steak",
      "sushi",
      "taco",
      "taiwanese",
      "tapas",
      "tea",
      "teriyaki",
      "tex-mex",
      "thai",
      "turkish",
      "vegetarian",
      "venezuelan",
      "vietnamese",
    ];
    if (cuisineType.indexOf(cuisineName) === -1) {
      alert("Try another cuisine!");
      $("#userInput").val("");
      return false;
    } else {
    }
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

      // FUNCTION AFTER DATA REQUEST SAVE INTO LOCAL STORAGE
      .then(function (response) {
        localStorage.setItem("response", JSON.stringify(response));
        window.location.href = "index2.html";
      });
  });

  // ON CLICK EVENT LISTENER FOR H4 ELEMENT ON INDEX2.HTML
  $("h4, .newNumber, .newAdd").on("click", function () {
    var t = $(this).data();
    var restObj = {
      name: t.rest.restName,
      hours: t.rest.times,
      address: t.rest.address,
      longitude: t.rest.long,
      latitude: t.rest.lat,
      number: t.rest.phoneNumber,
    };
    localStorage.setItem("thisRestObj", JSON.stringify(restObj));
    console.log(restObj);

    window.location.href = "index3.html";
  });
});

// DISPLAY MARKER ON GOOGLE MAPS 1 ON INDEX2.HTML
function displayMarker() {
  var local = JSON.parse(localStorage.getItem("response"));
  console.log(local);
  for (var i = 0; i < local.restaurants.length; i++) {
    var lat = local.restaurants[i].restaurant.location.latitude;
    var lng = local.restaurants[i].restaurant.location.longitude;
    var latLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
}

// INIT GOOGLE MAPS 1 ON INDEX 2
function initMap() {
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: { lat: 34.052, lng: -118.243 },
    zoom: 11,
  });
  displayMarker();
}

// DISPLAY MARKER ON GOOGLE MAPS 2 ON INDEX 3
function displayOneMarker() {
  var newlocal = JSON.parse(localStorage.getItem("thisRestObj"));
  var lat = newlocal.latitude;
  var lng = newlocal.longitude;
  var latLng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
}

// INIT GOOGLE MAPS ON INDEX 3
function initMap2() {
  map = new google.maps.Map(document.getElementById("googleMaps2"), {
    center: { lat: 34.052, lng: -118.243 },
    zoom: 11.5,
  });
  displayOneMarker();
}

// RENDER "THIS" OBJECT ON INDEX 3
function renderThisRestObj() {
  var thisRestObj = JSON.parse(localStorage.getItem("thisRestObj"));
  $(".restResults").text(thisRestObj.name);
  $(".hours").text(thisRestObj.hours);
  $(".address").text(thisRestObj.address);
  $(".number").text(thisRestObj.number);
}

// FUNCTION SAVE AND RENDER ITEMS AND DISPLAY ON PAGE
function renderItems() {
  var local = JSON.parse(localStorage.getItem("response"));
  for (var i = 0; i < local.restaurants.length; i++) {
    var restName = local.restaurants[i].restaurant.name;
    var cuisineType = local.restaurants[i].restaurant.cuisines;
    var address = local.restaurants[i].restaurant.location.address;
    var phoneNumber = local.restaurants[i].restaurant.phone_numbers;
    var times = local.restaurants[i].restaurant.timings;
    var long = local.restaurants[i].restaurant.location.longitude;
    var lat = local.restaurants[i].restaurant.location.latitude;
    var all = new Object();
    all.restName = restName;
    all.cuisineType = cuisineType;
    all.address = address;
    all.phoneNumber = phoneNumber;
    all.times = times;
    all.long = long;
    all.lat = lat;
    console.log(all);
    var divEl = $("<h4>");
    var pAddress = $("<p>", { class: "newAdd" });
    var pNumber = $("<p>", { class: "newNumber" });
    divEl.attr("data-rest", JSON.stringify(all));
    pAddress.attr("data-rest", JSON.stringify(all));
    pNumber.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    pAddress.text(address).appendTo($("#results"));
    pNumber.text(phoneNumber).appendTo($("#results"));
    // $(".address").attr("data-rest", JSON.stringify(all));
    // $(".phoneNumber").attr("data-rest", JSON.stringify(all));
    // $("<p>", { class: "address" }).text(address).appendTo($("#results"));
    // $("<p>", { class: "phoneNumber" })
    // .text(phoneNumber)
    // .appendTo($("#results"));

    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
}
renderItems();
renderThisRestObj();
