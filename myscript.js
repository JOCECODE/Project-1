var localStorage = JSON.parse(localStorage.getItem("response"));
$(document).ready(function (event) {
  $("#cuisineSearch").on("click", function (event) {
    event.preventDefault();
    var cuisineName = $("#userInput").val().trim();
    var qURL =
      "https://developers.zomato.com/api/v2.1/search?count=20&city_id=281&q=" +
      cuisineName;
    var qURL2 =
      "https://developers.zomato.com/api/v2.1/search?count=20&start=20&city_id=281&q=" +
      cuisineName;
    var qURL3=
      "https://developers.zomato.com/api/v2.1/search?count=20&start=40&city_id=281&q=" +
      cuisineName;
    var qURL4 =
      "https://developers.zomato.com/api/v2.1/search?count=20&start=60&city_id=281&q=" +
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
    var settings2 = {
      url: qURL2,
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    };
    var settings3 = {
      url: qURL3,
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    };
    var settings4 = {
      url: qURL4,
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": apiKey,
      },
    };
    var a1 = $.ajax(settings)
      // After data comes back from the request
      .then(function (response) {
        localStorage.setItem("response", JSON.stringify(response));
        localStorage.setItem("cuisine", JSON.stringify(cuisineName));
        window.location.href = "index2.html";
      });
    var a2 = $.ajax(settings2)
      // After data comes back from the request
      .then(function (response) {
        localStorage.setItem("response2", JSON.stringify(response));
      });
    var a3 = $.ajax(settings3)
      // After data comes back from the request
      .then(function (response) {
        localStorage.setItem("response3", JSON.stringify(response));
      });
    var a4 = $.ajax(settings4)
      // After data comes back from the request
      .then(function (response) {
        localStorage.setItem("response4", JSON.stringify(response));
      });

    $.when(a1, a2, a3, a4).done(function(response) {
      console.log(response)
    });
    // ONCLICK TO PAGE 3
  });
  $("h4").on("click", function () {
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

function displayMarker() {
  var local = JSON.parse(localStorage.getItem("response"));
  console.log(local);
  for (var i = 0; i < 10; i++) {
    var lat = local.restaurants[i].restaurant.location.latitude;
    var lng = local.restaurants[i].restaurant.location.longitude;
    var latLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
}
function initMap() {
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: { lat: 34.052, lng: -118.243 },
    zoom: 10,
  });
  displayMarker();
}

function initMap2() {
  map = new google.maps.Map(document.getElementById("googleMaps2"), {
    center: { lat: 34.052, lng: -118.243 },
    zoom: 10,
  });
  displayOneMarker();
}

function displayOneMarker(){
  var newlocal =JSON.parse(localStorage.getItem("thisRestObj"));
  var lat = newlocal.latitude;
  var lng = newlocal.longitude;
  var latLng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });

}

function renderThisRestObj() {
  var thisRestObj = JSON.parse(localStorage.getItem("thisRestObj"));
  $(".restResults").text(thisRestObj.name);
  $(".hours").text(thisRestObj.hours);
  $(".address").text(thisRestObj.address);
  $(".number").text(thisRestObj.number);
}

function renderItems() {
  var local = JSON.parse(localStorage.getItem("response"));

  for (var i = 0; i < 10; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
}
renderItems();
renderThisRestObj();

// Pagination clicks
$("#one").on("click", function() {
  $("#one").addClass("current")
  $("#results").empty()
  renderItems();
})


$("#two").on("click", function () {
  $("#one").removeClass("current")
  $("#two").addClass("current")
  $("#results").empty()

  var local = JSON.parse(localStorage.getItem("response"));

  for (var i = 10; i < 20; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
})

$("#three").on("click", function() {
  $("#two").removeClass("current");
  $("#three").addClass("current");
  $("#results").empty();

  var local = JSON.parse(localStorage.getItem("response2"));

  for (var i = 0; i < 10; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
})

$("#four").on("click", function () {
  $("#three").removeClass("current")
  $("#four").addClass("current")
  $("#results").empty()

  var local = JSON.parse(localStorage.getItem("response2"));

  for (var i = 10; i < 20; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
})

$("#five").on("click", function() {
  $("#four").removeClass("current");
  $("#five").addClass("current");
  $("#results").empty();

  var local = JSON.parse(localStorage.getItem("response3"));

  for (var i = 0; i < 10; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
})

$("#six").on("click", function () {
  $("#five").removeClass("current")
  $("#six").addClass("current")
  $("#results").empty()

  var local = JSON.parse(localStorage.getItem("response3"));

  for (var i = 10; i < 20; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
})

$("#seven").on("click", function() {
  $("#six").removeClass("current");
  $("#seven").addClass("current");
  $("#results").empty();

  var local = JSON.parse(localStorage.getItem("response4"));

  for (var i = 0; i < 10; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
})

$("#eight").on("click", function () {
  $("#seven").removeClass("current")
  $("#eight").addClass("current")
  $("#results").empty()

  var local = JSON.parse(localStorage.getItem("response4"));

  for (var i = 10; i < 20; i++) {
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
    divEl.attr("data-rest", JSON.stringify(all));
    divEl.text(restName).appendTo($("#results"));
    $("<h3>", { id: "cuisineType" }).text(cuisineType).appendTo($("#results"));
    $("<p>", { id: "address" }).text(address).appendTo($("#results"));
    $("<p>", { id: "phoneNumber" })
      .text("Phone Number: " + phoneNumber)
      .appendTo($("#results"));
    $("<br>").appendTo($("#results"));
    localStorage.setItem("restName" + [i], JSON.stringify(all));
  }
})



// FILTER BUTTON
function toggleDropdown() {
  document.querySelector("#filterChoices").classList.toggle("show");
}

// DROPDOWN MENU CLOSES ON OUTSIDE CLICK
$(window).click(function outsideClick(event) {
  event.stopPropagation();
  if (!event.target.matches(".filterBtn")) {
    document.querySelector("#filterChoices").classList.remove("show");
  }
});