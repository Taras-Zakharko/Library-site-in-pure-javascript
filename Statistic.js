let TopFiveBooks = [];
let TopFiveVisitor = [];

let allBooksCard = [];
let allVisitorCard = [];

let listTopBook = document.querySelector('.list__topBook');
let listTopVisitor = document.querySelector('.list__topVisitor');

let myLoc = window.localStorage;

getBooksAndVisitor()
function getBooksAndVisitor(){
  for (let i = 0; i < myLoc.length; i++) {
    const key = myLoc.key(i);
    if (key.match(/card\d+/)) {

      allBooksCard.push(JSON.parse(myLoc.getItem(key)).TitleBook);
      allVisitorCard.push(JSON.parse(myLoc.getItem(key)).NameVisitor);

    };
  };
};

let uniqueTitleOfCard = [...new Set(allBooksCard)]; 
let uniqueNameVisitorOfCard = [...new Set(allVisitorCard)]; 

for (let i = 0; i < uniqueTitleOfCard.length; i++) {
  
    let arr = allBooksCard.filter(book => book === uniqueTitleOfCard[i]);
    
    TopFiveBooks.push(arr);
};


TopFiveBooks.sort(function (a, b) {
  return b.length - a.length;
});

for (let i = 0; i < 5; i++) {

  listTopBook.innerHTML += `<li class="book__top"><span class="num__topBook">${i+1}.</span><p class="title__topBook">${TopFiveBooks[i][0]}</p></li>` ;

};

for (let i = 0; i < uniqueNameVisitorOfCard.length; i++) {
  
  let arr = allVisitorCard.filter(vis => vis === uniqueNameVisitorOfCard[i]);
  
  TopFiveVisitor.push(arr);
  
}

TopFiveVisitor.sort(function (a, b) {
return b.length - a.length;
});

for (let i = 0; i < 5; i++) {
  TopFiveVisitor[i][0];

  listTopVisitor.innerHTML += `<li class="book__top"><span class="num__topBook">${i+1}.</span><p class="title__topBook">${TopFiveVisitor[i][0]}</p></li>` ;

};

