// @ts-nocheck
const modal = document.querySelector('.modal');
const bgDark = document.querySelector('.bg-dark');

// button
const addBookBtn = document.querySelector('.add-book-btn');
const saveBtn = document.querySelector('.save-book-btn');
const closeDialogBtn = document.querySelector('.close-btn');
const moreBtn = document.querySelector('.more-btn');
const bookEditBtn = document.querySelector('.book-edit-btn');
const bookDeleteBtn = document.querySelector('.book-delete-btn');

// input
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const languageSelect = document.getElementById('language');
const currentPageInput = document.getElementById('current-page');
const isDoneReadCheckbox = document.getElementById('is-done');


titleInput.addEventListener('input', e => console.log(e.target.value));

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
    currentPageInput.disabled = false;
    isDoneReadCheckbox.checked = false;
}

const Library = new LibraryClass();


// eventListener
addBookBtn?.addEventListener('click', e => {
    e.preventDefault();
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

isDoneReadCheckbox?.addEventListener('click', e => {
    currentPageInput.disabled = e.target.checked;
});

moreBtn.addEventListener('click', e => {
    e.stopPropagation();
    moreBtn.classList.toggle('active')
});

document.addEventListener('click', e => {
    if(moreBtn.className.includes('active') != null) {
        moreBtn.classList.remove('active')
    }
});

bookEditBtn.addEventListener('click', () => console.log('edit'));
bookDeleteBtn.addEventListener('click', () => console.log('delete'));