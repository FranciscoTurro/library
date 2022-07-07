const modalContainer = document.getElementById("modalContainer");
const modalButton = document.querySelector(".modalButton");
const addButton = document.getElementById("addButton");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPageNum = document.getElementById("pageNum");
const checkRead = document.getElementById("read");

function Book(title, author, pageNum, read) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.read = read;
}

let Library = [];

function addBookToLibrary(title, author, pageNum, read) {
  let newBook = new Book(title, author, pageNum, read);
  Library.push(newBook);
}
function CicleArray() {
  Library.forEach((item) => {
    console.log(item);
  });
}

modalButton.addEventListener("click", () => {
  modalContainer.style.display = "block";
});

window.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    modalContainer.style.display = "none";
  }
});

function checkCheckbox() {
  if (checkRead.checked) return true;
  else return false;
}

addButton.addEventListener("click", () => {
  addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPageNum.value,
    checkCheckbox()
  );
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPageNum.value = "";
  CicleArray();
});
