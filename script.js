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

addBookToLibrary("Baskerville", "Doyle", "69", true);

Library.forEach((item) => {
  console.log(item);
});
