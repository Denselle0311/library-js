const modal = document.querySelector('.modal');
const bgDark = document.querySelector('.bg-dark');
const addBookBtn = document.querySelector('.add-book-btn');
const closeDialogBtn = document.querySelector('.close-btn');
const currentPages = document.querySelector('#current-pages');
const saveBtn = document.querySelector('.save-book-btn');

class Book {
    constructor(
        title,
        author,
        pages,
        language,
        status,
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.language = language;
        this.status = status;
        this.id = crypto.randomUUID();
    }
}

class LibraryClass {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(toRemoveBook) {
        this.books = this.books.filter(b => b.id != toRemoveBook.id);
    }

    getBook(findBook) {
        return this.books.find(b => b.id == findBook.id);
    }

    isInTheLibrary(findBook) {
        return this.books.find(b => b.id == findBook.id);
    }
}

function openModal() {
    modal?.classList.add('active')
    bgDark?.classList.add('active');
}

function closeModal() {
    modal?.classList.remove('active')
    bgDark?.classList.remove('active');
}

const Library = new LibraryClass();

const isDone = document.querySelector('#is-done');

// eventListener

addBookBtn?.addEventListener('click', () => {
    openModal();
});

saveBtn?.addEventListener('click', ()=> {
    closeModal();
});

closeDialogBtn?.addEventListener('click', () => { 
    closeModal();
});

bgDark?.addEventListener('click', () => {
    closeModal();
})

isDone?.addEventListener('click', e => {
    currentPages.disabled = e.target.checked;
});