let listVisitorsSelect = [];
let listBooksSelect = [];
let AllCards = [];

let myLoc = window.localStorage;

const btnNewCard = document.querySelector('.btn__new-card');
let SortCard = document.querySelector('#sort');
const btnSortCard = document.querySelector('.btn__sort-cards');
let inpSearchCard = document.querySelector('.search__card');
const btnSearchCard = document.querySelector('.btn__search-cards');
let CardList = document.querySelector('.cards__list');
const CreateCardForm = document.querySelector('.create__card-form');
let visitorSelect = document.querySelector('#visitors__select');
let bookSelect = document.querySelector('#books__select');
const btnCreateCard = document.querySelector('.btn__create-card');

ShowAllCards();

btnNewCard.addEventListener('click', function (e) {
  e.stopPropagation();
  CreateCardForm.classList.remove('hide');
  closeForm();
});

function closeForm() {
  if (CreateCardForm.className === 'create__card-form') {
    window.addEventListener('click', function (e) {
      if (e.target !== CreateCardForm && e.target !== visitorSelect && e.target !== bookSelect && e.target != document.querySelector('.form__title') && e.target != document.querySelector('.label-vis') && e.target != document.querySelector('.label-book')) {
        CreateCardForm.classList.add('hide');
      };
    });
  };
};

addVisitorSelect();
function addVisitorSelect() {
  for (let i = 0; i < myLoc.length; i++) {
    const key = myLoc.key(i);
    if (key.match(/visitor\d+/)) {

      listVisitorsSelect.push(JSON.parse(myLoc.getItem(key)));

    };
  };

  for (let i = 0; i < listVisitorsSelect.length; i++) {
    const visitor = listVisitorsSelect[i];

    visitorSelect.innerHTML += `<option value="${visitor.id}">${visitor.Name}</option>`;
  };
};

addBookSelect();
function addBookSelect() {
  for (let i = 0; i < myLoc.length; i++) {
    const key = myLoc.key(i);
    if (key.match(/book\d+/)) {
      listBooksSelect.push(JSON.parse(myLoc.getItem(key)));
    };
  };

  for (let i = 0; i < listBooksSelect.length; i++) {
    const book = listBooksSelect[i];

    if (book.Copies > 0) {
      bookSelect.innerHTML += `<option value="${book.key}">${book.Title}</option>`;
    };
  };
};


btnCreateCard.addEventListener('click', function (e) {
  e.stopPropagation();
  addCardToMyLoc();
  reloadCopiesBook();
});


function addCardToMyLoc() {
  let visitorId = visitorSelect.value;
  let bookId = bookSelect.value;
 
  let takeBook = JSON.parse(myLoc.getItem(bookId));
  let takeVisitor = JSON.parse(myLoc.getItem(visitorId));

  let uniqueCardId = Date.now();
  let now = new Date().toLocaleDateString();


  let newCard = {
    id: `card${uniqueCardId}`,
    NameVisitor: `${takeVisitor.Name}`,
    TitleBook: `${takeBook.Title}`,
    BorrowDate: `${now}`,
    ReturnDate: `<Button class="return__book">Return</Button>`,
    BookID: `${bookId}`
  };

  let strNewCard = JSON.stringify(newCard);

  myLoc.setItem(newCard.id, strNewCard);
  ShowAllCards();

  CreateCardForm.classList.add('hide');
};

function reloadCopiesBook(){
  let bookId = bookSelect.value;

  let Book = JSON.parse(myLoc.getItem(bookId));
  

  Book.Copies --;
 

  let strBook = JSON.stringify(Book);

  myLoc.setItem(bookId, strBook);
};

function ShowAllCards() {
  CardList.innerHTML = '';

  for (let i = 0; i < myLoc.length; i++) {
    const key = myLoc.key(i);
    if (key.match(/card\d+/)) {
      AllCards.push(JSON.parse(myLoc.getItem(key)));
    };
  };

  for (let i = 0; i < AllCards.length; i++) {
    CardList.innerHTML += `<tr id="${AllCards[i].id}">
      <td>${AllCards[i].id}</td>
      <td>${AllCards[i].NameVisitor}</td>
      <td>${AllCards[i].TitleBook}</td>
      <td>${AllCards[i].BorrowDate}</td>
      <td>${AllCards[i].ReturnDate}</td>
     </tr>`;
  };
};

returnBook();
function returnBook() {
  let btnReturn = document.querySelectorAll('.return__book');

  for (let i = 0; i < btnReturn.length; i++) {
    btnReturn[i].addEventListener('click', function (e) {
      e.stopPropagation();
      let returnDate = new Date().toLocaleDateString();

      let card = JSON.parse(myLoc.getItem(e.target.parentElement.parentElement.id));
      console.log(card);

      let retCard = {
        id: `${card.id}`,
        NameVisitor: `${card.NameVisitor}`,
        TitleBook: `${card.TitleBook}`,
        BorrowDate: `${card.BorrowDate}`,
        ReturnDate: `${returnDate}`,
        BookID: `${card.BookID}`
      };

      let strRetCard = JSON.stringify(retCard);

      myLoc.setItem(e.target.parentElement.parentElement.id, strRetCard);

      let BookRet = JSON.parse(myLoc.getItem(card.BookID));
      BookRet.Copies ++;

      let strBookRet = JSON.stringify(BookRet);

      myLoc.setItem(card.BookID, strBookRet);

      ShowAllCards();
      
      window.location.reload();
    });
  };
};



sortCardFunk();
btnSortCard.addEventListener('click', sortCardFunk);

function sortCardFunk() {

  if (SortCard.value === 'visitor') {
    AllCards.sort(function (a, b) {
      let visitorA = a.NameVisitor.toUpperCase();
      let visitorB = b.NameVisitor.toUpperCase();
      if (visitorA < visitorB) {
        return -1;
      }
      if (visitorA > visitorB) {
        return 1;
      }
      return 0;
    });

    CardList.innerHTML = '';

    for (let i = 0; i < AllCards.length; i++) {
      CardList.innerHTML += `<tr id="${AllCards[i].id}">
      <td>${AllCards[i].id}</td>
      <td>${AllCards[i].NameVisitor}</td>
      <td>${AllCards[i].TitleBook}</td>
      <td>${AllCards[i].BorrowDate}</td>
      <td>${AllCards[i].ReturnDate}</td>
     </tr>`;
    };
  };

  if (SortCard.value === 'Book') {
    AllCards.sort(function (a, b) {
      let TitleBookA = a.TitleBook.toUpperCase();
      let TitleBookB = b.TitleBook.toUpperCase();
      if (TitleBookA < TitleBookB) {
        return -1;
      }
      if (TitleBookA > TitleBookB) {
        return 1;
      }
      return 0;
    });

    CardList.innerHTML = '';

    for (let i = 0; i < AllCards.length; i++) {
      CardList.innerHTML += `<tr id="${AllCards[i].id}">
      <td>${AllCards[i].id}</td>
      <td>${AllCards[i].NameVisitor}</td>
      <td>${AllCards[i].TitleBook}</td>
      <td>${AllCards[i].BorrowDate}</td>
      <td>${AllCards[i].ReturnDate}</td>
     </tr>`;
    };
  };

  if (SortCard.value === 'Book') {
    AllCards.sort(function (a, b) {
      let TitleBookA = a.TitleBook.toUpperCase();
      let TitleBookB = b.TitleBook.toUpperCase();
      if (TitleBookA < TitleBookB) {
        return -1;
      }
      if (TitleBookA > TitleBookB) {
        return 1;
      }
      return 0;
    });

    CardList.innerHTML = '';

    for (let i = 0; i < AllCards.length; i++) {
      CardList.innerHTML += `<tr id="${AllCards[i].id}">
      <td>${AllCards[i].id}</td>
      <td>${AllCards[i].NameVisitor}</td>
      <td>${AllCards[i].TitleBook}</td>
      <td>${AllCards[i].BorrowDate}</td>
      <td>${AllCards[i].ReturnDate}</td>
     </tr>`;
    };
  };

  if (SortCard.value === 'Borrow Date') {
    AllCards.sort(function (a, b) {
      let BorrowA = a.BorrowDate.toUpperCase();
      let BorrowB = b.BorrowDate.toUpperCase();
      if (BorrowA < BorrowB) {
        return -1;
      }
      if (BorrowA > BorrowB) {
        return 1;
      }
      return 0;
    });

    CardList.innerHTML = '';

    for (let i = 0; i < AllCards.length; i++) {
      CardList.innerHTML += `<tr id="${AllCards[i].id}">
      <td>${AllCards[i].id}</td>
      <td>${AllCards[i].NameVisitor}</td>
      <td>${AllCards[i].TitleBook}</td>
      <td>${AllCards[i].BorrowDate}</td>
      <td>${AllCards[i].ReturnDate}</td>
     </tr>`;
    };
  };

  if (SortCard.value === 'Return Date') {
    AllCards.sort(function (a, b) {
      let ReturnA = a.ReturnDate.toUpperCase();
      let ReturnB = b.ReturnDate.toUpperCase();
      if (ReturnA < ReturnB) {
        return -1;
      }
      if (ReturnA > ReturnB) {
        return 1;
      }
      return 0;
    });

    CardList.innerHTML = '';

    for (let i = 0; i < AllCards.length; i++) {
      CardList.innerHTML += `<tr id="${AllCards[i].id}">
      <td>${AllCards[i].id}</td>
      <td>${AllCards[i].NameVisitor}</td>
      <td>${AllCards[i].TitleBook}</td>
      <td>${AllCards[i].BorrowDate}</td>
      <td>${AllCards[i].ReturnDate}</td>
     </tr>`;
    };
  };

  returnBook();
};

searchCardFunk();
btnSearchCard.addEventListener('click', searchCardFunk);

function searchCardFunk() {
  let inpSearchCardValue = inpSearchCard.value;
  
  function _filter(arr, value) {
    return arr.filter(el => {
      return el.NameVisitor.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        el.TitleBook.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        el.BorrowDate.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  };

  let FoundCard = _filter(AllCards, inpSearchCardValue);

  CardList.innerHTML = '';

  for (let i = 0; i < FoundCard.length; i++) {
    CardList.innerHTML += `<tr id="${FoundCard[i].id}">
      <td>${FoundCard[i].id}</td>
      <td>${FoundCard[i].NameVisitor}</td>
      <td>${FoundCard[i].TitleBook}</td>
      <td>${FoundCard[i].BorrowDate}</td>
      <td>${FoundCard[i].ReturnDate}</td>
     </tr>`;     
  };
  returnBook();
};












