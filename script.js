const modalContainer = document.getElementById("modalContainer");
const Container = document.getElementById("container");
const modalButton = document.querySelector(".modalButton");
const addButton = document.getElementById("addButton");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPageNum = document.getElementById("pageNum");
const checkRead = document.getElementById("read");
const modeToggle = document.getElementById("modeToggle");
const body = document.body;
const header = document.getElementById("header");
const modal = document.querySelector(".modal");

class Books {
  constructor(title, author, pageNum, read) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.read = read;
  }
}

class libraryClass {
  constructor() {
    this.Library = []; //array that acts as the library
  }

  addBook(book) {
    this.Library.push(book);
  }

  removeBook(title) {
    //filters the array to keep only books with titles different than the one given
    this.Library = this.Library.filter((item) => item.title != title);
  }

  toggleRead(title) {
    const bookTEST = this.Library.find((book) => book.title === title);
    if (bookTEST.read == true) bookTEST.read = false;
    else if (bookTEST.read == false) bookTEST.read = true;
  }

  isInLibrary(bookTitle) {
    return this.Library.some((book) => book.title === bookTitle);
  }
}

const library = new libraryClass();

function checkCheckbox() {
  if (checkRead.checked) return true;
  else return false;
}

function CicleArray() {
  //logs the entire array. troubleshooting only
  library.Library.forEach((item) => {
    console.log(item);
  });
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
  cardAuthor.textContent = "Written by " + book.author;
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
    library.removeBook(e.target.parentNode.parentNode.firstChild.innerHTML); //didnt think of this. e.target is the button, the parent node of the button is buttonDiv. the parent node of buttonDiv is card. the first child of card is the title
    Container.innerHTML = ""; //resets the container and writes the array on cards again
    library.Library.forEach((item) => {
      createCards(item);
    });
  });

  readButton.addEventListener("click", (e) => {
    library.toggleRead(e.target.parentNode.parentNode.firstChild.innerHTML);
    Container.innerHTML = ""; //resets the container and writes the array on cards again
    library.Library.forEach((item) => {
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
    !library.isInLibrary(inputTitle.value)
  ) {
    Container.innerHTML = ""; //resets the container every time
    const bookT = new Books(
      inputTitle.value,
      inputAuthor.value,
      inputPageNum.value,
      checkCheckbox()
    );
    library.addBook(bookT);
    inputTitle.value = "";
    inputAuthor.value = ""; //resets the inputs, closes the modal and calls the createcards function inside of a foreach to create a card for each item in library
    inputPageNum.value = "";
    modalContainer.style.display = "none";
    library.Library.forEach((item) => {
      createCards(item);
    });
  } else {
    alert(
      "Make sure that you complete all fields with valid information. Book titles cannot be repeated."
    );
  }
});

let tracker;
modeToggle.addEventListener("click", () => {
  body.classList.toggle("darkmodeBody");
  header.classList.toggle("darkmodeHeader");
  modal.classList.toggle("darkmodeModal");

  if (tracker == "t") {
    modeToggle.src = "images/dark.png";
    tracker = "asd"; //logic is absolute dogshit on this but i couldnt get it to work by doing if (modeToggle.src == ....) so it stays like this
  } else {
    modeToggle.src = "images/light.png";
    tracker = "t";
  }
});
