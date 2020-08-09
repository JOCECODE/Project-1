// $(document).ready(function () {
//   var qURL =
//     "https://developers.zomato.com/api/v2.1/cuisines?city_id=281";
//   var apiKey = "2250e0cbe30b423e649121eee80563d0";
//   $(".searchBar").on("click", function (event) {
//     event.preventDefault();

//     var inputVal = $("#userSearch").val().trim();
//     $.ajax({
//       async: true,
//       crossDomain: true,
//       url: qURL,
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "user-key": apiKey,
//       },
//     })
//       // After data comes back from the request
//       .then(function (response) {
//         console.log(qURL);

//         console.log(response);
//       });
//   });
// });
