window.onload = () => {

  checkUser();
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
      if (but.name == "application") {
        body.append("user", JSON.parse(localStorage.getItem("user-cake")).id);
      }
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
      } else if (but.name == "user") {
        document.querySelector("body").style = "";
        document.querySelectorAll(".modal_window").forEach((block) => {
          block.style = "";
        });
        data.admin = Number(data.admin);
        localStorage.setItem("user-cake", JSON.stringify(data));
        checkUser();
      } else if (but.name == "application") {
        item.reset();
        document.querySelector("body").style = "";
        document.querySelectorAll(".modal_window").forEach((block) => {
          block.style = "";
        });
        document.querySelector("body").style = "overflow: hidden;";
        application_compleat.style = "top:0";
      }
    });
  });
  document.querySelector(".topbar_burger").addEventListener("click", () => {
    document.querySelector(".topbar").classList.toggle("topbar--active");
    document
      .querySelector(".topbar__menu")
      .classList.toggle("topbar__menu--active");
  });
};
$(".photo_gallery__body").slick({
  responsive: [
    {
      breakpoint: 769,
      settings: { arrows: false },
    },
  ],
});
$(".reviews__body").slick({
  responsive: [
    {
      breakpoint: 769,
      settings: { arrows: false },
    },
  ],
});
function checkUser() {
  if (!localStorage.getItem("user-cake")) {
    document.querySelector(".topbar__auth").innerHTML = `
            <button class="topbar__auth__button" id="butLogin">Вход</button>
            <span class="topbar__auth__seporator">|</span>
            <button class="topbar__auth__button" id="butLogup">Регистрация</button>
    `;
    butLogin.addEventListener("click", openLogin);
    butLogup.addEventListener("click", openLogup);
  } else {
    let user = JSON.parse(localStorage.getItem("user-cake"));
    if (user.admin)
      document.querySelector(".topbar__auth").innerHTML = `
            <button class="topbar__auth__button" onclick = "window.location = 'admin/'">Панель администратора</button>
            <span class="topbar__auth__seporator">|</span>
            <button class="topbar__auth__button" id="butLogout">Выйти</button>
    `;
    else
      document.querySelector(".topbar__auth").innerHTML = `
            <button class="topbar__auth__button" onclick="openBasket()">Оформить заказ</button>
            <span class="topbar__auth__seporator">|</span>
            <button class="topbar__auth__button" id="butLogout">Выйти</button>
      `
    document.querySelector(".topbar__menu").insertAdjacentHTML("afterbegin", `
      <li class="topbar__menu__li">
          <a href="./profile.html" class="topbar__menu__link">Личный кабинет</a>
      </li>
      `)
      ;
    document.querySelector("#butLogout").addEventListener("click", () => {
      localStorage.removeItem("user-cake");
      window.location = "./";
      checkUser();
    });
  }
}
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
            <button class="catalog__list__card__button" value="${item.id}">ЗАКАЗАТЬ</button>
        </article>
        `
        );
      });
      document
        .querySelectorAll(".catalog__list__card__button")
        .forEach((item) => {
          item.addEventListener("click", (e) => {
            openBasket(e.target.value);
          });
        });
      break;
    }
    case "filling": {
      let block = document.querySelector(".fillings__body");
      block.innerHTML = ``;
      data.forEach((item) => {
        document.querySelector("#application-filling").insertAdjacentHTML(
          "beforeEnd",
          `
                        <option value="${item.id}">${item.name}</option>
        `
        );
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
function openLogup() {
  document.querySelector("body").style = "overflow: hidden;";
  logup.style = "top:0";
}
function openBasket(selected = false) {
  if (localStorage.getItem("user-cake")) {
    document.querySelector("body").style = "overflow: hidden;";
    application.style = "top:0";
    document.querySelector(".modal_block").innerHTML = "";
    if (selected) {
      document
        .querySelector(".modal_block")
        .insertAdjacentHTML(
          "beforeend",
          `<input type="hidden" name="product" value="${selected}"/>`
        );
    } else {
      document.querySelector(".modal_block").insertAdjacentHTML(
        "beforeend",
        `
      <div class="form-row">
          <label for="image" class="form-row__label">Прикрепить готовый дизайн</label>
          <input type="file" name="image" class="form-row__input" required>
      </div>
      <div class="form-row__textarea">
          <label for="">Деталти дизайна</label>
          <span>Укажите: цвет покрытия,
              надпись и ее цвет,
              рисунок и его цвета.</span>
          <textarea name="description_design" id="" required></textarea>
      </div>
`
      );
    }
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
document.querySelector("input[name='date']").min = new Date()
  .toISOString()
  .split("T")[0];