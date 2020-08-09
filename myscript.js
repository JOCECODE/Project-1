function toggleDropdown() {
  document.querySelector("#filterChoices").classList.toggle("show");
}

window.onclick = function (event) {
  console.log("clicked");
  if (!event.target.matches(".filterBtn")) {
    toggleDropdown();
  }
};
