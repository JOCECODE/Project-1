$(document).ready(function () {
  $(“#cuisineSearchBtn”).on(“click”, function (event) {
    event.preventDefault();
    var cuisineName = $(“#cuisineSearch”).val().trim();
    var qURL =
      “https://developers.zomato.com/api/v2.1/search?city_id=281&q=” +
      cuisineName +
      “&count=10”;
    $(“#cuisineSearch”).val(“”); //CLEARS INPUT FIELD ONCE SEARCH IS CLICKED
    $.ajax({
      async: true,
      crossDomain: true,
      url: qURL,
      method: “GET”,
      headers: {
        Accept: “application/json”,
        “user-key”: apiKey,
      },
    })
      // AFTER DATA COMES BACK FROM REQUEST
      .then(function (response) {
        console.log(qURL);
  function initMap() {
    map = new google.maps.Map(document.getElementById(“googleMaps”), {
      center: { lat: 34.024, lng: -118.496 },
      zoom: 10
    }); }
function createMap(restaurant){
function toggleDropdown() {
  document.querySelector(“#filterChoices”).classList.toggle(“show”);
}
// window.onclick = function (event) {
//   console.log(“clicked”);
//   if (!event.target.matches(“.filterBtn”)) {
//     toggleDropdown();
//   }
};