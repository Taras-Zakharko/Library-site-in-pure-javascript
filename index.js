const AllBooks = [];

const openFormAddBook = document.querySelector('.btn__new-book');
let myLoc = window.localStorage;
const addBookForm = document.querySelector('.form__addbook');
let listBooks = document.querySelector('.list__books');
let sortValue = document.querySelector('#sort');
const btnSort = document.querySelector('.btn__sort-book');

let searchInput = document.querySelector('#searc-book');
const btnSearch = document.querySelector('.btn__search-book');
const btnEditBook = document.querySelector('.btn__editbook');
const AddBook = document.querySelector('.btn__addbook');

let inpTitleBook = document.querySelector('.inp-title__book');
let inpAuthorBook = document.querySelector('.inp-autor__book');
let inpYearBook = document.querySelector('.inp-year__book');
let inpNameBook = document.querySelector('.inp-publ__book');
let inpNumberBook = document.querySelector('.inp-numb-page__book');
let inpCopiesBook = document.querySelector('.inp-copies__book');

addInArray();
openFormAddBook.addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelector('.form__title').innerHTML = 'New Book:';
    addBookForm.classList.remove('hide');
    if (btnEditBook.className === 'btn__editbook') {
        btnEditBook.classList.add('hide');
        AddBook.classList.remove('hide');
    }
    closeForm();
});

AddBook.addEventListener('click', function (e) {

    if (checkForm() === true) {
        let uniqueId = Date.now();

        let newB = {
            key: `book${uniqueId}`,
            Title: inpTitleBook.value,
            Author: inpAuthorBook.value,
            Year: inpYearBook.value,
            Name: inpNameBook.value,
            Number: inpNumberBook.value,
            Copies: inpCopiesBook.value
        };

        let strNew = JSON.stringify(newB);

        myLoc.setItem(`${newB.key}`, strNew);

        addInArray();
        addBookForm.classList.add('hide');
    }
    else {
        e.preventDefault();
    };
});

function checkForm() {
    let date = new Date();
    let thisYear = date.getFullYear();

    if (inpTitleBook.value === '') {
        document.querySelector('.error__title').innerHTML = 'Введіть назву книжки!!!';
        return false;
    }
    else {
        document.querySelector('.error__title').innerHTML = '';
    };

    if (inpAuthorBook.value === '') {
        document.querySelector('.error__autor').innerHTML = 'Введіть авторів!!';
        return false;
    } 
    else {
        document.querySelector('.error__autor').innerHTML = '';
    };

    if (inpYearBook.value === '') {
        document.querySelector('.error__year').innerHTML = 'Введітьр Рік публікації!!!';
        return false;
    } 
    else {
        document.querySelector('.error__year').innerHTML = '';
    };

    if (+inpYearBook.value < 0) {
        document.querySelector('.error__year').innerHTML = 'Рік публікації має бути в межах вуд 0 до теперішнього року';
        return false;
    } 
    else {
        document.querySelector('.error__year').innerHTML = '';
    };

    if (+inpYearBook.value > thisYear) {
        document.querySelector('.error__year').innerHTML = 'Рік публікації має бути в межах вуд 0 до теперішнього року';
        return false;
    } 
    else {
        document.querySelector('.error__year').innerHTML = '';
    };

    if (inpNameBook.value === '') {
        document.querySelector('.error__name-pub').innerHTML = 'Введіть назву видання!!';
        return false;
    } 
    else {
        document.querySelector('.error__name-pub').innerHTML = '';
    };

    if (inpNumberBook.value === '') {
        document.querySelector('.error__number').innerHTML = 'Введіть кількість сторінок!!!';
        return false;
    } 
    else {
        document.querySelector('.error__number').innerHTML = '';
    };

    if (+inpNumberBook.value < 0) {
        document.querySelector('.error__number').innerHTML = 'Кількість сторінок не може бути менше 0!!!';
        return false;
    } 
    else {
        document.querySelector('.error__number').innerHTML = '';
    };

    if (inpCopiesBook.value === '') {
        document.querySelector('.error__copies').innerHTML = 'Введіть кількість екземплярів';
        return false;
    } 
    else {
        document.querySelector('.error__copies').innerHTML = 'Кількість сторінок не може бути менше 0!!!';
    };

    if (+inpCopiesBook.value < 0) {
        document.querySelector('.error__copies').innerHTML = 'Кількість екземплярів не може бути менше 0!!!';
        return false;
    } 
    else {
        document.querySelector('.error__copies').innerHTML = 'Кількість сторінок не може бути менше 0!!!';
    };
    return true;
};

function addInArray() {
    listBooks.innerHTML = '';
    if (AllBooks.length === 0) {
        for (let i = 0; i < myLoc.length; i++) {
            const key = myLoc.key(i);
            if (key.match(/book\d+/g)) {
                AllBooks.push(JSON.parse(myLoc.getItem(key)));
            };
        };
    }
    else {
        AllBooks.length = 0;

        for (let i = 0; i < myLoc.length; i++) {
            const key = myLoc.key(i);
            if (key.match(/book\d+/g)) {
                AllBooks.push(JSON.parse(myLoc.getItem(key)));

                listBooks.innerHTML += `<tr id="${key}">
                <td>${i + 1}</td>
                <td>${AllBooks[i].Title}</td>
                <td>${AllBooks[i].Author}</td>
                <td>${AllBooks[i].Year}</td>
                <td>${AllBooks[i].Name}</td>
                <td>${AllBooks[i].Number}</td>
                <td>${AllBooks[i].Copies}</td>
                <td><button class="edit__book">Edit</button> / <button class="delete__book">Delete</button></td>
            </tr>`;
            };
        };
    };
};

sortBookList();
btnSort.addEventListener('click', sortBookList);

function sortBookList() {
    if (sortValue.value === 'title') {
        AllBooks.sort(function (a, b) {
            let titleA = a.Title.toUpperCase();
            let titleB = b.Title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });
        listBooks.innerHTML = '';
        for (let i = 0; i < AllBooks.length; i++) {

            listBooks.innerHTML += `<tr id="${AllBooks[i].key}">
                <td>${i + 1}</td>
                <td>${AllBooks[i].Title}</td>
                <td>${AllBooks[i].Author}</td>
                <td>${AllBooks[i].Year}</td>
                <td>${AllBooks[i].Name}</td>
                <td>${AllBooks[i].Number}</td>
                <td>${AllBooks[i].Copies}</td>
                <td><button class="edit__book">Edit</button> / <button class="delete__book">Delete</button></td>
            </tr>`;
        };
    };

    if (sortValue.value === 'autor') {
        AllBooks.sort(function (a, b) {
            let autorA = a.Author.toUpperCase();
            let autorB = b.Author.toUpperCase();
            if (autorA < autorB) {
                return -1;
            }
            if (autorA > autorB) {
                return 1;
            }
            return 0;
        });
        listBooks.innerHTML = '';
        for (let i = 0; i < AllBooks.length; i++) {

            listBooks.innerHTML += `<tr id="${AllBooks[i].key}">
                <td>${i + 1}</td>
                <td>${AllBooks[i].Title}</td>
                <td>${AllBooks[i].Author}</td>
                <td>${AllBooks[i].Year}</td>
                <td>${AllBooks[i].Name}</td>
                <td>${AllBooks[i].Number}</td>
                <td>${AllBooks[i].Copies}</td>
                <td><button class="edit__book">Edit</button> / <button class="delete__book">Delete</button></td>
            </tr>`;
        };
    };

    if (sortValue.value === 'copies') {
        AllBooks.sort(function (a, b) {
            return a.Copies - b.Copies;
        });
        listBooks.innerHTML = '';
        for (let i = 0; i < AllBooks.length; i++) {

            listBooks.innerHTML += `<tr id="${AllBooks[i].key}">
                <td>${i + 1}</td>
                <td>${AllBooks[i].Title}</td>
                <td>${AllBooks[i].Author}</td>
                <td>${AllBooks[i].Year}</td>
                <td>${AllBooks[i].Name}</td>
                <td>${AllBooks[i].Number}</td>
                <td>${AllBooks[i].Copies}</td>
                <td><button class="edit__book">Edit</button> / <button class="delete__book">Delete</button></td>
            </tr>`;
        };
    };
    
    DeleteBookFunk();
    editBookFunk();
    closeForm();
};

btnSearch.addEventListener('click', searchInBooksList);

function searchInBooksList() {
    let searchValue = searchInput.value;

    function _filter(arr, value) {
        return arr.filter(el => {
            return el.Title.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                el.Author.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                el.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1;;
        });
    };

    let FoundBooks = _filter(AllBooks, searchValue);

    listBooks.innerHTML = '';
    for (let i = 0; i < FoundBooks.length; i++) {
        listBooks.innerHTML += `<tr id="${FoundBooks[i].key}">
                <td>${i + 1}</td>
                <td>${FoundBooks[i].Title}</td>
                <td>${FoundBooks[i].Author}</td>
                <td>${FoundBooks[i].Year}</td>
                <td>${FoundBooks[i].Name}</td>
                <td>${FoundBooks[i].Number}</td>
                <td>${FoundBooks[i].Copies}</td>
                <td><button class="edit__book">Edit</button> / <button class="delete__book">Delete</button></td>
            </tr>`;
    };
    DeleteBookFunk();
    editBookFunk();
    closeForm();
};

editBookFunk();
function editBookFunk() {
    const editBook = document.querySelectorAll('.edit__book');
    
    for (let i = 0; i < editBook.length; i++) {
        editBook[i].addEventListener('click', function (event) {
            event.stopPropagation();
            document.querySelector('.form__title').innerHTML = 'Edit Book:';
            addBookForm.classList.remove('hide');

            if (AddBook.className === 'btn__addbook') {
                AddBook.classList.add('hide');
                btnEditBook.classList.remove('hide');
            }

            closeForm();
            
            btnEditBook.addEventListener('click', () => {
                if (checkForm() === true) {
                    let editB = {
                        key: event.target.parentNode.parentNode.id,
                        Title: inpTitleBook.value,
                        Author: inpAuthorBook.value,
                        Year: inpYearBook.value,
                        Name: inpNameBook.value,
                        Number: inpNumberBook.value,
                        Copies: inpCopiesBook.value
                    };

                    let strEditB = JSON.stringify(editB);

                    myLoc.setItem(event.target.parentNode.parentNode.id, strEditB);
                };
            });
        });
    };
};

function closeForm(){
    if(addBookForm.className === 'form__addbook'){
        window.addEventListener('click', function(e){
          if(e.target !== addBookForm &&  e.target !== inpAuthorBook && e.target !== inpCopiesBook && e.target !== inpNameBook && e.target !== inpNumberBook && e.target !== inpTitleBook && e.target !== btnEditBook && e.target !== AddBook && e.target !== inpYearBook && e.target !== document.querySelector('.form__title')){
            addBookForm.classList.add('hide');
          };
        });
      };
};

DeleteBookFunk();
function DeleteBookFunk(){
    const deleteBook = document.querySelectorAll('.delete__book');
    for (let i = 0; i < deleteBook.length; i++) {
        deleteBook[i].addEventListener('click', function (event) {
            event.stopPropagation();
            myLoc.removeItem(event.target.parentNode.parentNode.id);
            window.location.reload();
        });
    };
};

