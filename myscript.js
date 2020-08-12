$(document).ready(function () {
    $("#button-addon2").on("click", function (event) {
      event.preventDefault();
  
      var qURL =
        "https://developers.zomato.com/api/v2.1/search?city_id=281&q=mexican&count=10";
  
      var apiKey = "2250e0cbe30b423e649121eee80563d0";
  
      var cuisineName = $("#userInput").val().trim();
  
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
  
  window.onclick = function (event) {
    console.log("clicked");
    if (!event.target.matches(".filterBtn")) {
      toggleDropdown();
    }
  };





//var queryURL = "https://www.google.com/maps/search/?api=1&query="+ restaurant + "losangeles" 
var googleapiKey = "AIzaSyCykU04NtL76bdBse3BGOsVY43OWKXqiAY"
 

  function initMap() {
    map = new google.maps.Map(document.getElementById("googleMaps"), {
      center: { lat: 34.024, lng: -118.496 },
      zoom: 10
    }); }

function createMap(restaurant){
    

  
}
