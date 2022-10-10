const bookRowElement = document.getElementById("book-row");
const bookTitleElement = document.getElementById("book-title");
const bookAuthorElement = document.getElementById("author");
const bookDescriptionElement = document.getElementById("description");
const bookImageUrlElement = document.getElementById("book-img-url");
const bookEmailElement = document.getElementById("email");
const formElement = document.getElementById("book-form");

let books = [];
const URL_API = "https://crudcrud.com/api/6fc2048449e34cd8a821f63aad719693";

// Fetch Books from Backend
async function fetchBooks() {
  const response = await fetch(URL_API + "/books");
  if (response.status === 200) {
    const data = await response.json();
    books = data;
  }
}

fetchBooks().then(() => {
  displayBooks();
});

// Display Books
function displayBooks() {
  console.log("BOOKS", books);
}

// Create Book
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookTitle = bookTitleElement.value;
  const bookEmail = bookEmailElement.value;
  const bookAuthor = bookAuthorElement.value;
  const bookImgUrl = bookImageUrlElement.value;
  const bookDescription = bookDescriptionElement.value;
  const newBook = {
    title: bookTitle,
    email: bookEmail,
    author: bookAuthor,
    img: bookImgUrl,
    description: bookDescription,
  };
  addBook(newBook).then(() => {
    displayBooks();
  });
});

async function addBook(newBook) {
  const response = await fetch(URL_API + "/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newBook),
  });
  if (response.status === 201) {
    const data = await response.json();
    books.push(data);
    console.log(data);
  }
}
