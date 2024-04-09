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

document.querySelectorAll(".admin-form__input-file").forEach((item) => {
  item.addEventListener('change', () => {
    block = item.parentElement.firstElementChild;
    console.log(block);
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
    for (var i = 0; i < inpFileList.length; i++) {
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
    data = await fetch(`./assets/backend/api/${but.name}/${but.value}/`, {
      method: 'post',
      body
    }).then(text => text.json()).then(json => { return json })
    console.log(data);
  })
})