window.onload = () => {
  if (window.location.hash == "") {
    window.location.hash = "#category";
  }
  document.querySelectorAll(".leftbar__link").forEach((item) => {
    if (item.href == window.location) {
      item.classList.add("active");
    }
  });
  getfillings();
};

async function getfillings() {
  let body = new FormData();
  body.append("filling", "get");
  data = await fetch('./assets/api/index.php', {
    method: 'post',
    body
  }).then(text => text.json()).then(json => { return json });
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
          <td class="table__ceil"><img src="./.${item.image}"/></td>
          <td class="table__ceil">${item.name}</td>
          <td class="table__ceil">${item.description}</td>
          <td class="table__ceil">${item.id}</td>
        </tr>
      `
    )
  });
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
    data = await fetch('./assets/api/index.php', {
      method: 'post',
      body
    }).then(text => text.json()).then(json => { return json })
    switch (but.name) {
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
                <td class="table__ceil">${item.id}</td>
              </tr>
            `
          )
        })
        break;
      }
      case "products": {
        break;
      }
      case "category": {
        break;
      }
    }
    item.querySelector(".admin-form__label-content").innerHTML="";
    item.reset()
  })
})