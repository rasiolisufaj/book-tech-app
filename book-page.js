const bookId = window.location.search.split("=")[1];
const editButtonEl = document.getElementById("edit");
const deleteButtonEl = document.getElementById("delete");
// const bookRowElement = document.getElementById("book-row");
const bookTitleElement = document.getElementById("book-title");
const bookAuthorElement = document.getElementById("author");
const bookDescriptionElement = document.getElementById("description");
const bookImageUrlElement = document.getElementById("book-img-url");
const bookEmailElement = document.getElementById("email");
const formElement = document.getElementById("book-form");
const singleBookElement = document.getElementById("single-book");
const formContainerElement = document.getElementById("form-container");
// const buttonsDiv = document.querySelector(".buttons");
// console.log(buttonsDiv.innerHTML);
let book;
const URL_API = "https://crudcrud.com/api/5eb5b000f4ff44c4869c3dc1c9af6b82";

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
  singleBookElement.innerHTML = "";

  createBookTemplate(book);
}

fetchBook()
  .then(() => {
    displayBook();
  })
  .catch((err) => {
    // window.location = "index.html";
    console.log(err.message);
  });

// Function Create Book Template
function createBookTemplate(newBook) {
  singleBookElement.innerHTML = `
    <div class="book-image">
      <img src="${newBook.image}" />
      <h3>${newBook.title}</h3>
      <h4>${newBook.author}</h4>
    </div>
    <div class="book-details">
      <p>${newBook.description}</p>
      <h2>Star Rating</h2>
      <div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>
    </div>
  `;
  const bookButtonsContainer = document.createElement("div");

  const editBtnElement = document.createElement("button");
  editBtnElement.id = "edit";
  editBtnElement.addEventListener("click", fillEditBookForm);
  editBtnElement.classList.add("form-btn");
  editBtnElement.innerText = "Edit";

  const deleteBtnElement = document.createElement("button");
  deleteBtnElement.id = "delete";
  deleteBtnElement.addEventListener("click", handleDelete);
  deleteBtnElement.classList.add("form-btn");
  deleteBtnElement.innerText = "Delete";

  bookButtonsContainer.classList.add("buttons");
  bookButtonsContainer.append(editBtnElement, deleteBtnElement);

  singleBookElement.children[1].append(bookButtonsContainer);

  singleBookElement.append(formContainerElement);
  // return singleBookElement;
}

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
  }
}

// Function Delete
async function deleteBook() {
  const response = await fetch(URL_API + "/books/" + book._id, {
    method: "DELETE",
  });
  if (response.status !== 200) {
    throw new Error("Error deleting!");
  }
}

function handleDelete() {
  deleteBook()
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((err) => {
      alert(err.message);
    });
}

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
    // let id = book._id;
    // book = newBook;
    // book._id = id;
    book = { ...newBook, _id: book._id };
    displayBook();
  });

  bookTitleElement.value = "";
  bookAuthorElement.value = "";
  bookEmailElement.value = "";
  bookImageUrlElement.value = "";
  bookDescriptionElement.value = "";
});
