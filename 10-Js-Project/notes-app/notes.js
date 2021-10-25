const note = document.querySelector(".notes");
const editButton = document.querySelector(".edit");
const main = note.querySelector(".main");
const textArea = document.querySelector("textarea");

localStorage.clear();

editButton.addEventListener("click", () => {
  const content = textArea.value;
  let length = localStorage.length;
  localStorage.setItem(`${length}`, JSON.stringify(content));
  textArea.value = "";
  showText();
});

function showText() {
  main.innerHTML = "";
  let i = 0;
  while (i <= localStorage.length) {
    let x = localStorage.getItem(i);
    if (x !== null) {
      let y = document.createElement("li");
      y.textContent = x;
      y.classList.add(i);
      main.appendChild(y);
      addDelButton(y);
    }
    i++;
  }
}

function addDelButton(tag) {
  let x = document.createElement("button");
  x.innerHTML = `<i class="fas fa-trash-alt">`;

  x.addEventListener("click", (e) => {
    let num = tag.className;
    localStorage.removeItem(num);
    showText();
  });
  tag.appendChild(x);
}
