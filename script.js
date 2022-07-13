const modalContainer = document.getElementById("modalContainer");
const Container = document.getElementById("container");
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
} //a lo mejor es buena idea agregar esto a un prototype de Book para poder hacer por ejemplo newbook.addToLibrary o algo asi

function CicleArray() {
  Library.forEach((item) => {
    console.log(item);
  });
}

function checkCheckbox() {
  if (checkRead.checked) return true;
  else return false;
}

function createCards(book) {
  const card = document.createElement("div");
  const cardTitle = document.createElement("p");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const buttonDiv = document.createElement("div");
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  card.classList.add("bookCard");
  buttonDiv.classList.add("buttonDiv");

  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  cardPages.textContent = book.pageNum + " pages";

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  buttonDiv.appendChild(readButton);
  buttonDiv.appendChild(removeButton);
  card.appendChild(buttonDiv);
  Container.appendChild(card);
}

modalButton.addEventListener("click", () => {
  modalContainer.style.display = "block";
});

window.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    modalContainer.style.display = "none";
  }
});

addButton.addEventListener("click", () => {
  if (
    inputTitle.value.length != 0 &&
    inputAuthor.value.length != 0 &&
    inputPageNum.value.length != 0
  ) {
    Container.innerHTML = "";
    addBookToLibrary(
      inputTitle.value,
      inputAuthor.value,
      inputPageNum.value,
      checkCheckbox()
    );
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPageNum.value = "";
    modalContainer.style.display = "none";
    Library.forEach((item) => {
      createCards(item);
    });
  } else {
    alert("Make sure that you complete all fields with valid information.");
  }
});
