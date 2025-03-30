const myLibrary = [];
const container = document.querySelector(".container")
const addBook = document.querySelector("[data-open-modal]");
const modal = document.querySelector("[data-modal]")
const modalClose = document.querySelector("[data-close-modal]");
const form = document.querySelector("#addBookForm");



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`)
    }
}

function addBookToLibrary(library, title, author, pages, read) {
    // take params, create a book then store it in the array
    let book = new Book(title, author, pages, read)
    book.id = crypto.randomUUID()
    library.push(book)
}

addBookToLibrary(myLibrary, "Harry Potter and the Order of the Phoenix", "J.K. Rowling", 912, "Read")
addBookToLibrary(myLibrary, "The Hunger Games", "Suzanne Collins", 374, "Read")
addBookToLibrary(myLibrary, "Pride and Prejudice", "Jane Austen", 279, "Read")
addBookToLibrary(myLibrary, "To Kill a Mockingbird", "Harper Lee", 323, "Not Read")

function displayBook(array) {
    for (const object of array) {
        const card = document.createElement("div")
        const title = document.createElement("p")
        const author = document.createElement("p")
        const page = document.createElement("p")
        const read = document.createElement("p")

        title.innerHTML = "Book Title:<br>" + object.title
        author.innerHTML = "Author:<br>" + object.author
        page.innerHTML = "Pages: " + object.pages
        read.innerHTML = "Status: " + object.read
        
        card.appendChild(title)
        card.appendChild(author)
        card.appendChild(page)
        card.appendChild(read)

        container.appendChild(card)
    }
}

displayBook(myLibrary)

addBook.addEventListener("click", ()=> {
    modal.showModal()
})

modalClose.addEventListener("click", ()=> {
    modal.close()
})

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const formData = new FormData(form)
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const status = formData.get("status");

    addBookToLibrary(myLibrary, title, author, pages, status)
    container.innerHTML = "";
    displayBook(myLibrary)
    form.reset()
    modal.close()
})

