// @ts-nocheck
const moreMenuIcon = '../images/more.png';
const bookContainer = document.getElementById('book-container');
const modal = document.querySelector('.modal');
const bgDark = document.querySelector('.bg-dark');
const form = document.querySelector('.create-form');

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

class Book {
    constructor(
        title,
        author = 'No author',
        pages = '??',
        language,
        currentPage = 0,
        doneReading = false,
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.language = language;
        this.currentPage = currentPage;
        this.doneReading = doneReading;
        this.id = crypto.randomUUID();
    }
}

let isBookTitleExist = false

class LibraryClass {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(id) {
        this.books = this.books.filter(b => b.id != id);
    }

    getBook(id) {
        return this.books.find(b => b.id == id);
    }
    
    isInTheLibrary(title) {
        return this.books.some(b=> b.title == title);
    }
}

function openModal() {
    modal?.classList.add('active')
    bgDark?.classList.add('active');
    titleInput.focus();
}

function closeModal() {
    modal?.classList.remove('active')
    bgDark?.classList.remove('active');
    currentPageInput.disabled = false;
    isDoneReadCheckbox.checked = false;
    form.reset();
}

const Library = new LibraryClass();

function toPasCalCase(val) {
    if(!val) return null;
    console.log(val)
    return val.trim().replace(/ +/g, ' ').split(' ').map(e=> e[0].toUpperCase() + e.slice(1)).join(' ');
}

function toggleSettings(ele) {
    console.log('toggle')
    ele.classList.toggle('active');
}

function editBook(id) {
    const book = Library.getBook(id);
    selectedBookToForm(book);
}

function deleteBook(id) {
    Library.removeBook(id);
    renderBooks();
}

function invalidMsg(input) {
    if(Library.isInTheLibrary(toPasCalCase(input.value))) {
        input.setCustomValidity("Title already exist!");
    } else {
        input.setCustomValidity('');
    }
    return true;
}

function selectedBookToForm(book) {
    [...form.elements].map(el => {
        console.log(book[el.name], el.name);
        switch(el.id) {
            case 'title' : titleInput.value = book[el.name];
                break;
            case 'author' : authorInput.value = book[el.name];
                break;
            case 'language' : languageSelect.value = book[el.name].toLowerCase();
                break;
            case 'pages' : pagesInput.value = book[el.name];
                break;
            case 'current-page' : currentPageInput.value = book[el.name];
                break;
            case 'is-done' : isDoneReadCheckbox.checked = book[el.name];
                break;
            default:
                Library.removeBook(book.id);
                openModal();
        }
    });
}

function createBookElements(book) {
    const bookDiv = document.createElement('div');
    bookDiv.id = 'book';

    const moreImage = document.createElement('img');
    moreImage.src = moreMenuIcon;
    
    const bookEditBtn = document.createElement('div');
    bookEditBtn.classList.add('book-edit-btn');
    bookEditBtn.appendChild(document.createTextNode('edit'));
    bookEditBtn.addEventListener('click', ()=> editBook(book.id));
    
    const bookDeleteBtn = document.createElement('div');
    bookDeleteBtn.classList.add('book-delete-btn');
    bookDeleteBtn.appendChild(document.createTextNode('delete'));
    bookDeleteBtn.addEventListener('click', ()=> deleteBook(book.id));
    
    const bookMenuDiv = document.createElement('div');
    bookMenuDiv.classList.add('book-menu');
    bookMenuDiv.append(bookEditBtn, bookDeleteBtn);

    const spanMore = document.createElement('span');
    spanMore.classList.add('more-btn');
    spanMore.addEventListener('click', () => toggleSettings(spanMore));

    spanMore.append(moreImage, bookMenuDiv);
    
    const titleHeader = document.createElement('h2');
    titleHeader.classList.add('title');
    titleHeader.textContent = book.title;

    const authorP = document.createElement('p');
    authorP.classList.add('author');
    authorP.textContent = book.author;

    const languageP = document.createElement('p');
    languageP.classList.add('language');
    languageP.textContent = book.language;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    
    contentDiv.append(titleHeader, authorP, languageP);
    
    const spanStatus = createStatus(book.currentPage, book.pages);

    bookDiv.append(spanMore, contentDiv, spanStatus);

    return bookDiv;
}

function createStatus(currentPage, pages) {
    const spanStatus = document.createElement('span');
    spanStatus.classList.add('status');
    
    const spanPage = document.createElement('span');
    spanPage.textContent = `${currentPage} / ${pages} pages`;

    const buttonPer = document.createElement('button');
    buttonPer.classList.add('read-percentage');

    const flexDivWrapper = document.createElement('div');
    flexDivWrapper.classList.add('flex-wrapper');

    const singleChartDiv = document.createElement('div');
    singleChartDiv.classList.add('single-chart')

    const svgCircle = createSvgCircle(currentPage, pages);

    singleChartDiv.appendChild(svgCircle);
    flexDivWrapper.appendChild(singleChartDiv);

    buttonPer.appendChild(flexDivWrapper);
    
    spanStatus.append(spanPage, buttonPer);

    return spanStatus;
}

function createSvgCircle(currentPage, pages) {
    const xmlns = "http://www.w3.org/2000/svg";
    const boxWidth = 36;
    const boxHeight = 36;

    const svgCircle = document.createElementNS(xmlns, 'svg');
    svgCircle.setAttributeNS(null, 'viewBox', "0 0 " + boxWidth + " " + boxHeight);
    svgCircle.classList.add('circular-chart', 'green');

    const coords = 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831';
    const pathBg = document.createElementNS(xmlns, 'path');
    pathBg.setAttributeNS(null, 'd', coords);
    pathBg.classList.add('circle-bg');

    const percentage = Math.floor(currentPage/pages*100);
    const strokeDashArr = `${percentage}, 100`;
    const path = document.createElementNS(xmlns, 'path');
    path.setAttributeNS(null, 'd', coords);
    path.setAttributeNS(null, 'stroke-dasharray', strokeDashArr);
    path.classList.add('circle');

    const text = document.createElementNS(xmlns, 'text');
    text.classList.add('percentage');
    text.textContent = percentage + '%';
    gsap.set(text, { x: 18 , y: 21.35}, {className: 'percentage'});

    svgCircle.append(pathBg, path, text);

    return svgCircle;
}

function renderBooks() {
    const books = Library.books.map(b => createBookElements(b));

    console.log(books);
    bookContainer.innerHTML = '';
    bookContainer.append(...books);
}

function saveBook() {
    const title = toPasCalCase(titleInput.value);
    const author = toPasCalCase(authorInput.value) || 'No Author';
    const pages = pagesInput.value;
    const language = toPasCalCase(languageSelect.value);
    const isDoneRead = isDoneReadCheckbox.checked;
    const currentPage = isDoneRead ? pages : currentPageInput.value > pages ? pages : currentPageInput.value || 0;
    
    Library.addBook(new Book(title, author, pages, language, currentPage, isDoneRead));
    console.log(Library.books);
    renderBooks();
}

// inputListener
// titleInput.addEventListener('input', validateInputs);
// authorInput.addEventListener('input', validateInputs);
// pagesInput.addEventListener('input', validateInputs);
// languageSelect.addEventListener('change', validateInputs);
// currentPageInput.addEventListener('input', validateInputs);
// isDoneReadCheckbox.addEventListener('change', validateInputs);

// eventListener
addBookBtn?.addEventListener('click', e => {
    e.preventDefault();
    openModal();
});


form.addEventListener('submit', e => {
    e.preventDefault();

    saveBook();
    closeModal(e);
    e.target.reset();
})

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

bookEditBtn.addEventListener('click', () => console.log('edit'));
bookDeleteBtn.addEventListener('click', () => console.log('delete'));

document.addEventListener('click', e => {
    if(moreBtn.className.includes('active') != null) {
        moreBtn.classList.remove('active')
    }
});