const modalContainer = document.getElementById("modalContainer");
const Container = document.getElementById("container");
const modalButton = document.querySelector(".modalButton");
const addButton = document.getElementById("addButton");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPageNum = document.getElementById("pageNum");
const checkRead = document.getElementById("read");

function Book(title, author, pageNum, read) {
  //book object constructor
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.read = read;
}

const BookProto = {
  //book object prototype
  addBook() {
    Library.push(this);
  },
};
Book.prototype = BookProto;

let Library = []; //array that acts as the library

function CicleArray() {
  //logs the entire array. troubleshooting only
  Library.forEach((item) => {
    console.log(item);
  });
}

function removeBook(title) {
  //filters the array to keep only books with titles different than the one given
  Library = Library.filter((item) => item.title != title);
}

function toggleRead(title) {
  const bookTEST = Library.find((book) => book.title === title);
  if (bookTEST.read == true) bookTEST.read = false;
  else if (bookTEST.read == false) bookTEST.read = true;
}

function isInLibrary(bookTitle) {
  return Library.some((book) => book.title === bookTitle);
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
  const buttonDiv = document.createElement("div"); //create all the elements necessary for a card
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  card.classList.add("bookCard"); //give a class to the containers
  buttonDiv.classList.add("buttonDiv");

  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  cardPages.textContent = book.pageNum + " pages"; //give book values to the card to be added
  if (book.read == true) {
    readButton.textContent = "Not read";
    readButton.classList.add("notread");
    card.classList.add("readcard");
  } else {
    if (book.read == false) readButton.textContent = "Read";
    readButton.classList.add("read");
    card.classList.add("NOTreadcard");
  }
  removeButton.textContent = "Remove";

  card.appendChild(cardTitle);
  card.appendChild(cardAuthor); //append everything to its proper container
  card.appendChild(cardPages);
  buttonDiv.appendChild(readButton);
  buttonDiv.appendChild(removeButton);
  card.appendChild(buttonDiv);
  Container.appendChild(card);

  removeButton.addEventListener("click", (e) => {
    removeBook(e.target.parentNode.parentNode.firstChild.innerHTML); //didnt think of this. e.target is the button, the parent node of the button is buttonDiv. the parent node of buttonDiv is card. the first child of card is the title
    Container.innerHTML = ""; //resets the container and writes the array on cards again
    Library.forEach((item) => {
      createCards(item);
    });
  });

  readButton.addEventListener("click", (e) => {
    toggleRead(e.target.parentNode.parentNode.firstChild.innerHTML);
    Container.innerHTML = ""; //resets the container and writes the array on cards again
    Library.forEach((item) => {
      createCards(item);
    });
  });
}

modalButton.addEventListener("click", () => {
  modalContainer.style.display = "block"; //makes the modal appear
});

window.addEventListener("click", (e) => {
  if (e.target == modalContainer) {
    modalContainer.style.display = "none"; //makes the modal dissappear if i click outside of it
  }
});

addButton.addEventListener("click", () => {
  if (
    inputTitle.value.length != 0 &&
    inputAuthor.value.length != 0 && //verifying that all inputs are full and the book isnt repeated
    inputPageNum.value.length != 0 &&
    !isInLibrary(inputTitle.value)
  ) {
    Container.innerHTML = ""; //resets the container every time
    const bookT = new Book(
      inputTitle.value,
      inputAuthor.value,
      inputPageNum.value,
      checkCheckbox()
    );
    bookT.addBook();
    inputTitle.value = "";
    inputAuthor.value = ""; //resets the inputs, closes the modal and calls the createcards function inside of a foreach to create a card for each item in library
    inputPageNum.value = "";
    modalContainer.style.display = "none";
    Library.forEach((item) => {
      createCards(item);
    });
  } else {
    alert(
      "Make sure that you complete all fields with valid information. Book titles cannot be repeated."
    );
  }
});
