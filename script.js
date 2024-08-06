const apiKey = '3adb2af39c51b652228e7aa1e442f021';
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    fetchPopularMovies();

    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value;
        if (query) {
            searchMovies(query);
        }
    });
});

function fetchPopularMovies() {
    fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Erro ao buscar filmes populares:', error);
        });
}

function searchMovies(query) {
    fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Erro ao buscar filmes:', error);
        });
}

function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        const moviePoster = document.createElement('img');
        moviePoster.src = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/200x300';
        moviePoster.alt = `${movie.title} Poster`;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        const movieReleaseDate = document.createElement('p');
        movieReleaseDate.textContent = `Lançamento: ${movie.release_date}`;

        const movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;

        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieReleaseDate);
        movieCard.appendChild(movieOverview);

        movieList.appendChild(movieCard);

        movieCard.addEventListener('click', () => {
            displayMovieDetails(movie.id);
        });
    });
}

function displayMovieDetails(movieId) {
    // Pode ser implementado para exibir mais detalhes do filme, como elenco, sinopse, etc.
    console.log(`Exibir detalhes do filme com ID: ${movieId}`);
}
