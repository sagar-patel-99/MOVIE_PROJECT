const express = require('express');
const router = express.Router();
const axios = require('axios');
const { API_KEY, BASE_URL } = require('../config/api');

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/movie/:id', (req, res) => {
  const movieId = req.params.id;
  axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY
    }
  })
  .then(response => {
    const movie = response.data;
    res.render('movie', { movie });
  })
  .catch(error => {
    console.error('Error fetching movie details:', error);
    res.status(500).send('Internal Server Error');
  });
});

router.get('/top-rated', (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10;

  axios.get(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      page: page
    }
  })
  .then(response => {
    const topRatedMovies = response.data.results;
    const totalMovies = response.data.total_results;
    const totalPages = Math.min(Math.ceil(totalMovies / pageSize), 2);
    res.render('top-rated', { topRatedMovies, formatDate, page, totalPages });
  })
  .catch(error => {
    console.error('Error fetching top rated movies:', error);
    res.status(500).send('Internal Server Error');
  });
});

router.get('/search', (req, res) => {
  const query = req.query.query;
  const page = Number(req.query.page) || 1;
  const pageSize = 10;

  axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: page
    }
  })
  .then(response => {
    const searchResults = response.data.results;
    const totalPages = response.data.total_pages;
    const nextPageResultsAvailable = (page < totalPages);
    res.render('search', { searchResults, query, page, totalPages, formatDate, nextPageResultsAvailable });
  })
  .catch(error => {
    console.error('Error fetching search results:', error);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;