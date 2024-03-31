function fetchMovies(page, query) {
  fetch(`/search?query=${query}&page=${page}`)
    .then(response => response.json())
    .then(data => {
      renderMovies(data.searchResults);
      renderPagination(data.page, data.totalPages, query);
    })
    .catch(error => console.error('Error fetching movies:', error));
}

function handlePaginationClick(event) {
  const page = parseInt(event.target.dataset.page);
  const query = event.target.dataset.query;
  fetchMovies(page, query);
}

document.querySelectorAll('.pagination-button').forEach(button => {
  button.addEventListener('click', handlePaginationClick);
});

function togglePaginationButton() {
  const paginationContainer = document.getElementById('pagination-container');

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      paginationContainer.style.display = 'block';
  } else {
      paginationContainer.style.display = 'none';
  }

  const currentPage = parseInt(document.querySelector('.pagination-button.active').dataset.page);
  const totalPages = parseInt(document.querySelector('.pagination-button:last-child').dataset.page);

  if (currentPage >= totalPages) {
      document.querySelector('.pagination-button.next').style.display = 'none';
  } else {
      document.querySelector('.pagination-button.next').style.display = 'block';
  }
}

function renderMovies(movies) {
  // This function would typically update the DOM with the movie data.
  // Since this is a server-side script, we'll just log the movies for now.
  console.log(movies);
}
function renderPagination(paginationData) {
  // This function would typically update the DOM with the pagination data.
  // Since this is a server-side script, we'll just log the paginationData for now.
  console.log(paginationData);
}

function setupPaginationButtons() {
  document.querySelectorAll('.pagination-button').forEach(button => {
    button.addEventListener('click', handlePaginationClick);
  });
}

window.addEventListener('scroll', togglePaginationButton);
module.exports = { fetchMovies, handlePaginationClick, togglePaginationButton, setupPaginationButtons, renderMovies, renderPagination};
// script.js