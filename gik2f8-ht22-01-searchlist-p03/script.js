'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  const root = document.getElementById('root');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));
}


const elements = document.querySelectorAll(".book-list__item");
for(let i = 0; i < elements.length; i++) {
  elements[i] = elements.addEventListener("mouseover", (e) =>{
    let hoverBookDetails = BookDetails(e.target.id)
    hoverBookDetails.then(function (result) {
      renderBookDetails(result);
    })
  }
  )
  elements[i] = elements.addEventListener("mouseout", (e) =>{
    const existingElement = document.querySelector('.book-detail');
    existingElement && existingElement.remove()
  })
}
  
function renderBookDetails(book){
  const existingElement = document.getElementById('bookDetail');
  const root = document.getElementById('root');

  existingElement && existingElement.remove()

  const html = BookDetails(book);

  root.insertAdjacentHTML("afterend", html);
}