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
    document.querySelector("#filterChoices").classList.remove("show");
  }
};
