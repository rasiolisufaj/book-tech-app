const bookRowElement = document.getElementById("book-row");
const bookTitleElement = document.getElementById("book-title");
const bookAuthorElement = document.getElementById("author");
const bookDescriptionElement = document.getElementById("description");
const bookImageUrlElement = document.getElementById("book-img-url");
const bookEmailElement = document.getElementById("email");
const formElement = document.getElementById("book-form");
let books = [];
const URL_API = "https://crudcrud.com/api/5eb5b000f4ff44c4869c3dc1c9af6b82";

// Fetch Books from Backend
async function fetchBooks() {
  const response = await fetch(URL_API + "/books");
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}

fetchBooks().then((data) => {
  books = data;
  console.log(books);
  displayBooks();
});

// Display Books
function displayBooks() {
  bookRowElement.innerHTML = "";

  books.forEach((book) => {
    const bookTemplate = generateBookTemplate(book);
    bookRowElement.append(bookTemplate);
  });
}

// Function Generate Book Template
function generateBookTemplate(book) {
  const div = document.createElement("div");
  div.classList.add("book-info", "flex");
  div.innerHTML = `
    <img src="${book.image}" alt="${book.title}" />
    <h3>${book.title}</h3>
    <p>
      ${book.description}
    </p>
    <a href="book-page.html?book_id=${book._id}" class="btn">MORE</a>
    <input type="hidden" value= ${book._id}>
  `;
  // bookRowElement.append(div);
  return div;
}

// Function Add Book
async function addBook(newBook) {
  const response = await fetch(URL_API + "/books/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });
  if (response.status === 201) {
    const data = await response.json();
    books.push(data);
    console.log(data);
  }
}

// Create Book
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookTitle = bookTitleElement.value;
  const bookAuthor = bookAuthorElement.value;
  const bookEmail = bookEmailElement.value;
  const bookImgUrl = bookImageUrlElement.value;
  const bookDescription = bookDescriptionElement.value;

  if (
    bookTitle === "" ||
    bookAuthor === "" ||
    bookEmail === "" ||
    bookImgUrl === "" ||
    bookDescription === ""
  ) {
    return alert("Please fill in the form.");
  }

  const newBook = {
    title: bookTitle,
    author: bookAuthor,
    email: bookEmail,
    image: bookImgUrl,
    description: bookDescription,
  };
  addBook(newBook).then(() => {
    displayBooks();
  });

  bookTitleElement.value = "";
  bookAuthorElement.value = "";
  bookEmailElement.value = "";
  bookImageUrlElement.value = "";
  bookDescriptionElement.value = "";
});
