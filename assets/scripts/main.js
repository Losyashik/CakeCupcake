$(".photo_gallery__body").slick();
$(".reviews__body").slick();

function getFetch(url, data) {
  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error_code) {
        alert(data.error);
      } else {
        return data.list;
      }
    });
}
function openLogin() {
  document.querySelector("body").style = "overflow: hidden;";
  login.style = "top:0";
}
function opneLogup() {
  document.querySelector("body").style = "overflow: hidden;";
  logup.style = "top:0";
}
function openBasket() {
  if (localStorage.getItem("user")) {
    alert("Открытие корзины");
  } else {
    openLogin();
  }
}
async function createCatalog(category) {
  await getFetch(
    `./backend/productControler/?category=${category}`
  ).then((items) => {
    document.querySelector(".catalog__list").innerHTML = "";
    items.forEach((item) => {
      document.querySelector(".catalog__list").insertAdjacentHTML(
        "afterbegin",
        `
          <article class="catalog__list__card">
            <img src="${item.image}" alt="" class="catalog__list__card__image">
            <h4 class="catalog__list__card__heading">${item.name}</h4>
            <div class="catalog__list__card__price">${item.price}₽</div>
            <button class="catalog__list__card__button">ЗАКАЗАТЬ</button>
          </article>
          `
      );
    });
    updateEvens();
  });
}
function updateEvens() {
  document.querySelectorAll(".catalog__list__card__button").forEach((item) => {
    item.addEventListener("click", openBasket);
  });
}
butLogin.addEventListener("click", openLogin);
butLogup.addEventListener("click", opneLogup);
document.querySelectorAll(".modal_window__form__close").forEach((elem) => {
  elem.addEventListener("click", () => {
    document.querySelector("body").style = "";
    document.querySelectorAll(".modal_window").forEach((block) => {
      block.style = "";
    });
  });
});
document
  .querySelectorAll(".modal_window__form__link_block__link")
  .forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.preventDefault();
      if (elem.dataset.form == "reg") {
        login.style = "";
        logup.style = "top:0";
      } else if (elem.dataset.form == "login") {
        logup.style = "";
        login.style = "top:0";
      }
    });
  });

async function createCatalogNav() {
  await getFetch("./backend/CategoriesControler/").then((items) => {
    items.forEach((item) => {
      document.querySelector(".catalog__nav__ul").insertAdjacentHTML(
        "beforeend",
        `
        <li class="catalog__nav__li">
            <button 
              type="button" 
              class="catalog__nav__li__button" 
              data-category="${item.id}">
              ${item.name}
            </button>
        </li>
      `
      );
    });

    createCatalog(items[0].id);
  });
  document
    .querySelector(".catalog__nav__li__button:first-child")
    .classList.add("catalog__nav__li__button--active");
  document.querySelectorAll(".catalog__nav__li__button").forEach((item) => {
    item.addEventListener("click", () => {
      createCatalog(item.dataset.category);
      document
        .querySelector(".catalog__nav__li__button--active")
        .classList.remove("catalog__nav__li__button--active");
      item.classList.add("catalog__nav__li__button--active");
    });
  });
}
createCatalogNav();
