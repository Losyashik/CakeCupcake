window.onload = () => {
  if (window.location.hash == "") {
    window.location.hash = "#category";
  }
  document.querySelectorAll(".leftbar__link").forEach((item) => {
    if (item.href == window.location) {
      item.classList.add("active");
    }
  });
};

document.querySelectorAll(".leftbar__link").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("active")) return false;
    document.querySelector(".leftbar__link.active").classList.remove("active");
    item.classList.add("active");
  });
});

["dragover", "drop"].forEach(function (event) {
  document.addEventListener(event, function (evt) {
    evt.preventDefault()
  })
})




document.querySelectorAll(".admin-form__label-content").forEach(item => {
  ["dragstart", "dragenter"].forEach((e) => {
    document.addEventListener(e, () => {
      item.classList.add("drag")
    })
  });
  ["dragleave", "dragend", "drop"].forEach((e) => {
    document.addEventListener(e, () => {
      item.classList.remove("drag");
    })
  });
  item.addEventListener("drop", e => {
    console.log("drop");
  })
})