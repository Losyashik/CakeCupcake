window.onload = () => {
  if (window.location.hash == "") {
    window.location.hash = "#category";
  }
  document.querySelectorAll(".leftbar__link").forEach((item) => {
    if (item.href == window.location) {
      item.classList.add("active");
    }
  });
  getRequest("filling");
  getRequest("product");
  getRequest("category");
  getRequest("application");
};

function render(type, data) {
  switch (type) {
    case "filling": {
      let table = document.querySelector("#fillings-table");
      table.innerHTML = `<tr class="table__row">
                              <th class="table__heading-ceil" > id</th >
                              <th class="table__heading-ceil">Изображение</th>
                              <th class="table__heading-ceil">Название</th>
                              <th class="table__heading-ceil">Описание</th>
                              <th class="table__heading-ceil">Удалить</th>
                          </tr > `;
      data.forEach((item) => {

        table.insertAdjacentHTML("beforeEnd",
          `
            <tr class="table__row">
              <td class="table__ceil">${item.id}</td>
              <td class="table__ceil"><img src="./../${item.image}"/></td>
              <td class="table__ceil">${item.name}</td>
              <td class="table__ceil">${item.description}</td>
              <td class="table__ceil">
                <form class="table__delete-form" method="POST">
                  <input value = "${item.id}" name="id" type="hidden"/>
                  <button type="submit" name="filling" value="delete">Удалить</button>
                </form>
              </td>
            </tr>
          `
        )
      })
      break;
    }
    case "product": {
      let table = document.querySelector("#product-table");
      table.innerHTML = `<tr class="table__row">
                              <th class="table__heading-ceil">id</th>
                              <th class="table__heading-ceil">Изображение</th>
                              <th class="table__heading-ceil">Название</th>
                              <th class="table__heading-ceil">Цена</th>
                              <th class="table__heading-ceil">Категория</th>
                              <th class="table__heading-ceil">Удалить</th>
                          </tr>`;
      data.forEach((item) => {

        table.insertAdjacentHTML("beforeEnd",
          `
            <tr class="table__row">
              <td class="table__ceil">${item.id}</td>
              <td class="table__ceil"><img src="./../${item.image}"/></td>
              <td class="table__ceil">${item.name}</td>
              <td class="table__ceil">${item.price}</td>
              <td class="table__ceil">${item.category}</td>
              <td class="table__ceil">
                <form class="table__delete-form" method="POST">
                  <input value = "${item.id}" name="id" type="hidden"/>
                  <button type="submit" name="product" value="delete">Удалить</button>
                </form>
              </td>
            </tr>
          `
        )
      })
      break;
    }
    case "category": {
      let table = document.querySelector("#category-table");
      let select = document.querySelector("#product_category");
      table.innerHTML = `<tr class="table__row">
                              <th class="table__heading-ceil">id</th>
                              <th class="table__heading-ceil">Имя</th>
                              <th class="table__heading-ceil">Удалить</th>
                          </tr>`;
      select.innerHTML = "<option value='' selected></option>";
      data.forEach((item) => {
        select.insertAdjacentHTML("beforeEnd", `<option value='${item.id}'>${item.name}</option>`)
        table.insertAdjacentHTML("beforeEnd",
          `
            <tr class="table__row">
              <td class="table__ceil">${item.id}</td>              
              <td class="table__ceil">${item.name}</td>
              <td class="table__ceil">
                <form class="table__delete-form" method="POST">
                  <input value = "${item.id}" name="id" type="hidden"/>
                  <button type="submit" name="category" value="delete">Удалить</button>
                </form>
              </td>
            </tr>
          `
        )
      })
      break;
    }
    case "application": {
      let table = document.querySelector("#application-table");
      table.innerHTML = `<tr class="table__row">
                              <th class="table__heading-ceil">id</th>
                              <th class="table__heading-ceil">Имя заказчика</th>
                              <th class="table__heading-ceil">Название торта</th>
                              <th class="table__heading-ceil">Начинка</th>
                              <th class="table__heading-ceil">Номер телефона</th>
                              <th class="table__heading-ceil">Адрес</th>
                              <th class="table__heading-ceil">Выбраная дата</th>
                              <th class="table__heading-ceil">Изображение дизайна</th>
                              <th class="table__heading-ceil">Описание дизайна</th>
                              <th class="table__heading-ceil">Выполнено</th>
                          </tr>`;
      data.forEach((item) => {
        table.insertAdjacentHTML("beforeEnd",
          `
            <tr class="table__row">
              <td class="table__ceil">${item.id}</td>              
              <td class="table__ceil">${item.user}</td>
              <td class="table__ceil">${item.product?item.product:"Не выбрано"}</td>
              <td class="table__ceil">${item.filling}</td>
              <td class="table__ceil">${item.number}</td>
              <td class="table__ceil">${item.addres}</td>
              <td class="table__ceil">${item.date}</td>
              <td class="table__ceil">${item.image?`<img src="./../${item.image}"/>`:"Не добавлено"}</td>
              <td class="table__ceil">${item.description_design?item.description_design:"Нет описания"}</td>
              <td class="table__ceil">
                <form class="table__delete-form" method="POST">
                  <input value = "${item.id}" name="id" type="hidden"/>
                  <button type="submit" name="application" value="compleat">Выполнено</button>
                </form>
              </td>
            </tr>
          `
        )
      })
      break;
    }
  }
  document.querySelectorAll(".table__delete-form").forEach(item => {
    item.addEventListener('submit', async e => {
      e.preventDefault();
      let but = item.lastElementChild;
      let body = new FormData(item);
      body.append(but.name, but.value)
      data = await fetch('./../api/index.php', {
        method: 'post',
        body
      }).then(text => text.json()).then(json => { return json })
      render(but.name, data);
    })
  })
}
async function getRequest(type) {
  let body = new FormData();
  body.append(type, "get");
  data = await fetch('./../api/index.php', {
    method: 'post',
    body
  }).then(text => text.json()).then(json => { return json });
  render(type, data);
}
function addImage(block, input) {
  block.innerHTML = '';
  let images = input.files;
  [...images].forEach((file) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      block.insertAdjacentHTML('beforeEnd', `
      <img src="${e.target.result}" />
      `
      )
    };
    reader.readAsDataURL(file);
  });
}

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
document.querySelectorAll(".admin-form__input-file").forEach((item) => {
  item.addEventListener('change', () => {
    let block = item.parentElement.firstElementChild;
    addImage(block, item);
  })
})

document.querySelectorAll(".admin-form__label-file").forEach(item => {
  block = item.firstElementChild;
  ["dragstart", "dragenter"].forEach((e) => {
    document.addEventListener(e, () => {
      block.classList.add("drag")
    })
    item.addEventListener(e, () => {
      block.classList.add("drag")
    })
  });
  ["dragleave", "dragend", "drop"].forEach((e) => {
    document.addEventListener(e, () => {
      block.classList.remove("drag");
    })
    item.addEventListener(e, () => {
      block.classList.remove("drag")
    })
  });
  item.addEventListener("drop", e => {
    console.log("drop");
    let inp = item.lastElementChild;
    let inpFileList = inp.files;
    let addedFiles = e.dataTransfer.files;
    let newFileList = new DataTransfer();
    for (let i = 0; i < inpFileList.length; i++) {
      newFileList.items.add(inpFileList[i]);
    }
    [...addedFiles].forEach((file) => {
      newFileList.items.add(file);
    });
    inp.files = newFileList.files;
    addImage(block, inp)
  })
})
document.querySelectorAll(".admin-form").forEach(item => {
  item.addEventListener("submit", async e => {
    e.preventDefault();
    let but = item.lastElementChild;
    let body = new FormData(item);
    body.append(but.name, but.value)
    data = await fetch('./../api/index.php', {
      method: 'post',
      body
    }).then(text => text.json()).then(json => { return json })
    render(but.name, data);
    item.querySelector(".admin-form__label-content").innerHTML = "";
    item.reset()
  })
})