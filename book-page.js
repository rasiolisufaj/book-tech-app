const bookId = window.location.search.split("=")[1];
const editButtonEl = document.getElementById("edit");
const deleteButtonEl = document.getElementById("delete");
const bookRowElement = document.getElementById("book-row");
const bookTitleElement = document.getElementById("book-title");
const bookAuthorElement = document.getElementById("author");
const bookDescriptionElement = document.getElementById("description");
const bookImageUrlElement = document.getElementById("book-img-url");
const bookEmailElement = document.getElementById("email");
const formElement = document.getElementById("book-form");
let book;
const URL_API = "https://crudcrud.com/api/bf853291695a4bf587dd4304fd13cf47";

// Fetch Book
async function fetchBook() {
  const request = await fetch(URL_API + "/books/" + bookId);
  if (request.status === 200) {
    book = await request.json();
    console.log(book);
  } else {
    throw new Error("Can`t fetch book");
  }
}

// Function displayBook
function displayBook() {
  console.log(book);
}

fetchBook()
  .then(() => {
    displayBook();
  })
  .catch((err) => {
    // window.location = "index.html";
    console.log(err.message);
  });

// Function Fill Edit Book Form
function fillEditBookForm() {
  bookTitleElement.value = book.title;
  bookAuthorElement.value = book.author;
  bookEmailElement.value = book.email;
  bookImageUrlElement.value = book.image;
  bookDescriptionElement.value = book.description;
}

// Function Edit
async function editBook(editBook) {
  console.log(editBook);
  console.log(book);
  const response = await fetch(URL_API + "/books/" + book._id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editBook),
  });
  if (response.status === 201) {
    const data = await response.json();
    books.push(data);
    console.log(data);
  }
}

editButtonEl.addEventListener("click", () => {
  fillEditBookForm();
});

deleteButtonEl.addEventListener("click", () => {
  deleteBook();
});

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

  editBook(newBook).then(() => {
    let id = book._id;
    book = newBook;
    book._id = id;
    displayBook();
  });

  bookTitleElement.value = "";
  bookAuthorElement.value = "";
  bookEmailElement.value = "";
  bookImageUrlElement.value = "";
  bookDescriptionElement.value = "";
});
