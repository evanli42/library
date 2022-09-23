// create empty array to store book objects
let myLibrary = [];

// create object constructor for book entries
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  };

// popup input
// get dom for buttons
const openInputButtons = document.querySelectorAll('[data-input-target]');
const addInputButtons = document.querySelectorAll('[data-add-button]');
const overlay = document.getElementById('overlay');

// loop over each button to have the open function
openInputButtons.forEach(button => {
  button.addEventListener('click', () => {
    // select input button and call function
    const input = document.querySelector(button.dataset.inputTarget);
    openInput(input);
  });
});

// loop over each button to remove the class
addInputButtons.forEach(button => {
  button.addEventListener('click', () => {
    // select the closest parent element with input-container class
    const input = button.closest('.input-container');
    closeInput(input);
  });
});

// create function to open input
function openInput(input) {
  // check if it's called without an input
  if (input == null) return;
  // add active class to input and overlay
  input.classList.add('active');
  overlay.classList.add('active');
};

// create function to close input by removing active class
function closeInput(input) {
  // check if it's called without an input
  if (input == null) return;
  // add active class to input and overlay
  input.classList.remove('active');
  overlay.classList.remove('active');
};

// close input when clicking overlay
overlay.addEventListener('click', () => {
  // select all active inputs
  const inputs = document.querySelectorAll('.input-container.active')
  // loop for each active input and close
  inputs.forEach(input => {
    closeInput(input);
  });
});

// create a function to take user input and store new book objects into the array
function addBookToLibrary() {
    // get dom of each text input
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('author-name').value;
    let pages = document.getElementById('pages-read').value;

    // reset form after submitting book
    document.getElementById('input-form').reset();

    // add inputs into object constructor
    let newEntry = new Book(title, author, pages);

    // push new object into array
    myLibrary.push(newEntry);

    createBookTables();

    // call function to add an eventlistener to all toggle buttons 
    selectButton();
};

// was stuck for days because I was creating a table using js outside the function instead of putting it into the html, which caused the delete and add functions to not work properly (adding after deleting added back every single deleted entry)

function createBookTables() {
  myLibrary.forEach((item, index) => {

    if (index === (myLibrary.length - 1)) {
      document.querySelectorAll('table')[1].innerHTML += `
      <tr class='input-table'>
        <th>${item.title}</th>
        <th>${item.author}</th>
        <th>${item.pages}</th>
        <th><button type='button' class='toggle-button'>Completed</button></th>
        <th><button type='button' class='delete' data-index=${index}>Delete Entry</button></th>
      </tr>

      `
    };
  });
};

// get dom for box containing entries
let libraryBox = document.getElementById('box')

libraryBox.addEventListener('click', (e) => {
  // target the index of the delete button using the data-index 
  if (e.target.classList.contains('delete')) {
    myLibrary.splice(e.target.dataset.index, 1);
    console.log(myLibrary)
    e.target.parentElement.parentElement.remove();
  }
});

// create a function to call when adding tables to add the event listeners to all created buttons
function selectButton() {
  let toggle = document.querySelectorAll('.toggle-button');

  // e is referencing the button
  toggle.forEach((e) => {
    e.addEventListener('click', () => {
      console.log('test');
      if (e.textContent === 'Completed') {
        e.textContent = 'In Progress';
        e.style.background = '#ccfbf1';
      } else {
        e.textContent = 'Completed';
        e.style.background = '#34d399';
      }
    });
  });
};