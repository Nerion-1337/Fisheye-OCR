const loader = document.querySelector(".loader");
const body = document.querySelector("body");

window.addEventListener("load", () => {
  loader.style.display = "none";
  body.style.pointerEvents = "visible";
  body.style.userSelect = "text";
});
