window.onload = () => {
  getRequest("category");
  getRequest("product", "start");
  getRequest("filling");
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
  document.querySelectorAll(".modal_window__form__close").forEach((elem) => {
    elem.addEventListener("click", () => {
      document.querySelector("body").style = "";
      document.querySelectorAll(".modal_window").forEach((block) => {
        block.style = "";
      });
    });
  });
  document.querySelectorAll(".modal_window__form").forEach((item) => {
    item.addEventListener("submit", async (e) => {
      e.preventDefault();
      let block = document.querySelector(
        `#${item.parentElement.id} .modal_window__form__error`
      );
      block.innerHTML = "";
      block.classList.add("modal_window__form__error--active");
      let but = document.querySelector(
        `#${item.parentElement.id} .modal_window__form__submit`
      );
      let body = new FormData(item);
      body.append(but.name, but.value);
      if (but.value == "singup") {
        if (body.get("password") != body.get("password_dbl")) {
          openError("Пароли не совпадают", item);
          return false;
        }
      }
      data = await fetch("./api/index.php", {
        method: "post",
        body,
      })
        .then((text) => text.json())
        .then((json) => {
          return json;
        });
      if (data.error) {
        openError(data.message, item);
      } else {
        localStorage.setItem("user-cake", JSON.stringify(data));
      }
    });
  });
  butLogin.addEventListener("click", openLogin);
  butLogup.addEventListener("click", opneLogup);
};
$(".photo_gallery__body").slick();
$(".reviews__body").slick();
function render(type, data) {
  switch (type) {
    case "product": {
      let block = document.querySelector(".catalog__list");
      block.innerHTML = "";
      data.forEach((item) => {
        block.insertAdjacentHTML(
          "beforeEnd",
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
      break;
    }
    case "filling": {
      let block = document.querySelector(".fillings__body");
      block.innerHTML = ``;
      data.forEach((item) => {
        block.insertAdjacentHTML(
          "beforeEnd",
          `
                  <article class="fillings__body__item">
                    <img src="${item.image}" alt="" class="fillings__body__item__image">
                    <div class="fillings__body__item__description">
                        <h4 class="fillings__body__item__description__heading">${item.name}</h4>
                        <p class="fillings__body__item__description__text">${item.description}</p>
                    </div>
                  </article>
                  `
        );
      });
      break;
    }
    case "category": {
      let block = document.querySelector(".catalog__nav__ul");
      block.innerHTML = `<li class="catalog__nav__li catalog__nav__li_heading">
                          <h3>Каталог товаров</h3>
                        </li>`;
      data.forEach((item) => {
        block.insertAdjacentHTML(
          "beforeEnd",
          `
        <li class="catalog__nav__li">
          <button 
            type="button" 
            class="catalog__nav__li__button" 
            value = "${item.id}">
            ${item.name}
          </button>
        </li>
        `
        );
      });
      document.querySelectorAll(".catalog__nav__li__button").forEach((elem) => {
        elem.addEventListener("click", () => {
          getRequest("product", elem.value);
          document
            .querySelector(".catalog__nav__li__button--active")
            .classList.remove("catalog__nav__li__button--active");
          elem.classList.add("catalog__nav__li__button--active");
        });
      });
      document
        .querySelector(".catalog__nav__li__button:first-child")
        .classList.add("catalog__nav__li__button--active");
      break;
    }
  }
}
async function getRequest(type, id = 0) {
  let body = new FormData();

  if (id) {
    body.append(type, "selective-get");
    body.append("id", id);
  } else {
    body.append(type, "get");
  }
  data = await fetch("./api/index.php", {
    method: "post",
    body,
  })
    .then((text) => text.json())
    .then((json) => {
      return json;
    });
  render(type, data);
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
  if (localStorage.getItem("user-cake")) {
    alert("Открытие корзины");
  } else {
    openLogin();
  }
}
function updateEvens() {
  document.querySelectorAll(".catalog__list__card__button").forEach((item) => {
    item.addEventListener("click", openBasket);
  });
}

function openError(text, form) {
  let block = document.querySelector(
    `#${form.parentElement.id} .modal_window__form__error`
  );
  block.innerHTML = text;
  block.classList.add("modal_window__form__error--active");
}
