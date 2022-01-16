let AllVisitor = [];

let myLoc = window.localStorage;
const btnNewVisitor = document.querySelector('.btn__new-visitor');
let sortVisitorValue = document.querySelector('#sort');
const btnSortVisitor = document.querySelector('.btn__sort-visitor');
let inpSearchVisitor = document.querySelector('.search-visitor');
const btnSearchVisitor = document.querySelector('.btn__search-visitor');

let visitorList = document.querySelector('.visitor__list');
const AddVisitorForm = document.querySelector('.form__add-visitor');

addVisitorArr();
let inpVisitName = document.querySelector('.inp__visitor-name');
let inpVisitPhone = document.querySelector('.inp__visitor-phone');
let errVisitName = document.querySelector('.error__visit-name');
let errVisitPhone = document.querySelector('.error__visit-phone');
const btnVisitAdd = document.querySelector('.btn__addvisitor');
const btnVisitEdit = document.querySelector('.btn__editvisitor');

btnNewVisitor.addEventListener('click', function (e) {
  e.stopPropagation();
  document.querySelector('.form__title').innerHTML = 'New Visitor:';
  AddVisitorForm.classList.remove('hide');
  if (btnVisitEdit.className === 'btn__editvisitor') {
    btnVisitEdit.classList.add('hide');
    btnVisitAdd.classList.remove('hide');
  };
  closeForm();
});

btnVisitAdd.addEventListener('click', function (e) {
  if (checkVisitForm() === true) {
    let uniqueVisId = Date.now();

    let newVisitor = {
      id: `visitor${uniqueVisId}`,
      Name: inpVisitName.value,
      Phone: inpVisitPhone.value
    };

    let strNewVisit = JSON.stringify(newVisitor);

    myLoc.setItem(newVisitor.id, strNewVisit);
    addVisitorArr();
    AddVisitorForm.classList.add('hide');
  }
  else {
    e.preventDefault();
  };
});

function checkVisitForm() {
  if (inpVisitName.value === '') {
    errVisitName.innerHTML = 'Введіть імя та прізвище!!!';
    return false;
  }
  else {
    errVisitName.innerHTML = '';
  };
  if (inpVisitPhone.value === '') {
    errVisitPhone.innerHTML = 'Введіть номер телефону!!!';
    return false;
  }
  else if (!inpVisitPhone.value.match(/^[\d ]+?[\d-]+$/g)) {
    errVisitPhone.innerHTML = 'В номері телефону доступні лише цифри, пробіл та тире!!!';
    return false;
  }
  else {
    errVisitPhone.innerHTML = '';
  };
  return true;
};

function addVisitorArr() {
  visitorList.innerHTML = '';

  for (let i = 0; i < myLoc.length; i++) {
    const key = myLoc.key(i);
    if (key.match(/visitor\d+/)) {
      AllVisitor.push(JSON.parse(myLoc.getItem(key)));
    };
  };

  for (let i = 0; i < AllVisitor.length; i++) {
    visitorList.innerHTML += `<tr id="${AllVisitor[i].id}">
            <td>${AllVisitor[i].id}</td>
            <td>${AllVisitor[i].Name}</td>
            <td>${AllVisitor[i].Phone}</td>
            <td>
                <button class="edit__visitor">Edit</button>
            </td>
        </tr>`;
  };

};

sortVisitor();
btnSortVisitor.addEventListener('click', sortVisitor);

function sortVisitor() {
  if (sortVisitorValue.value === 'name-vis') {
    AllVisitor.sort(function (a, b) {
      let nameA = a.Name.toUpperCase();
      let nameB = b.Name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    visitorList.innerHTML = '';

    for (let i = 0; i < AllVisitor.length; i++) {
      visitorList.innerHTML += `<tr id="${AllVisitor[i].id}">
              <td>${AllVisitor[i].id}</td>
              <td>${AllVisitor[i].Name}</td>
              <td>${AllVisitor[i].Phone}</td>
              <td>
                  <button class="edit__visitor">Edit</button>
              </td> 
          </tr>`;
    };
  };

  if (sortVisitorValue.value === 'id') {
    AllVisitor.sort(function (a, b) {
      let idA = a.id.toUpperCase();
      let idB = b.id.toUpperCase();
      if (idA < idB) {
        return -1;
      }
      if (idA > idB) {
        return 1;
      }
      return 0;
    });

    visitorList.innerHTML = '';

    for (let i = 0; i < AllVisitor.length; i++) {

      visitorList.innerHTML += `<tr id="${AllVisitor[i].id}">
              <td>${AllVisitor[i].id}</td>
              <td>${AllVisitor[i].Name}</td>
              <td>${AllVisitor[i].Phone}</td>
              <td>
                  <button class="edit__visitor">Edit</button>
              </td>
          </tr>`;
    };
  };
  EditFunk();
};

btnSearchVisitor.addEventListener('click', searchVisitor);

function searchVisitor() {
  let inpSearchVisitorValue = inpSearchVisitor.value;
  
  function _filter(arr, value) {
    return arr.filter(el => {
      return el.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        el.Phone.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  };

  let FoundVisitor = _filter(AllVisitor, inpSearchVisitorValue);

  visitorList.innerHTML = '';

  for (let i = 0; i < FoundVisitor.length; i++) {
    visitorList.innerHTML += `<tr id="${FoundVisitor[i].id}">
            <td>${FoundVisitor[i].id}</td>
            <td>${FoundVisitor[i].Name}</td>
            <td>${FoundVisitor[i].Phone}</td>
            <td>
                <button class="edit__visitor">Edit</button>
            </td>
        </tr>`; 
  };
  EditFunk();
};



EditFunk();
function EditFunk() {
  const OpenEditForm = document.querySelectorAll('.edit__visitor');
  for (let i = 0; i < OpenEditForm.length; i++) {
    OpenEditForm[i].addEventListener('click', function (event) {
      event.stopPropagation();
      document.querySelector('.form__title').innerHTML = 'Edit Visitor:';
      AddVisitorForm.classList.remove('hide');
      if (btnVisitAdd.className === 'btn__addvisitor') {
        btnVisitAdd.classList.add('hide');
        btnVisitEdit.classList.remove('hide');
      }

      closeForm();

      btnVisitEdit.addEventListener('click', (e) => {
        if (checkVisitForm() === true) {
          let editVis = {
            id: event.target.parentElement.parentElement.id,
            Name: inpVisitName.value,
            Phone: inpVisitPhone.value
          }

          let strEditVis = JSON.stringify(editVis);

          myLoc.setItem(event.target.parentElement.parentElement.id, strEditVis);
          AddVisitorForm.classList.add('hide');
        };
      });
    });
  };
};

function closeForm(){
  if(AddVisitorForm.className === 'form__add-visitor'){
    window.addEventListener('click', function(e){
      if(e.target !== AddVisitorForm && e.target !== inpVisitName && e.target !== inpVisitPhone && e.target !== btnVisitAdd && e.target !== btnVisitEdit && e.target != document.querySelector('.form__title')  ){
        AddVisitorForm.classList.add('hide');
      };
    });
  };
};
