const apiKey = 'e37a3da0';

const listentoclick = function () {
    const filmposters = document.querySelectorAll('.js-poster');
    filmposters.forEach((poster) => {
        poster.addEventListener('click', function () {
            const posterId = poster.getAttribute('data-poster-id');
            console.log(`Clicked poster with ID: ${posterId}`);
            
        
        
        });
    });
}

document.getElementById('search-button').addEventListener('click', function () {
    const searchTerm = document.getElementById('search').value;
    const selectedGenre = document.getElementById('genre-filter').value;
    let url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

    if (selectedGenre) {
        url += `&genre=${selectedGenre}`;
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.Search) {
                data.Search.forEach((movie) => {
                    const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;

                    fetch(detailsUrl)
                        .then((detailsResponse) => detailsResponse.json())
                        .then((movieDetails) => {
                            const movieDiv = document.createElement('div');
                            const posterId = movie.imdbID; 
                            movieDiv.innerHTML = `
                                <h2>${movie.Title}</h2>
                                <p>IMDb ID: ${movie.imdbID}</p>
                                <p>${movie.Year}</p>
                                <img class="js-poster" id="poster" data-poster-id="${posterId}" src="${movie.Poster}" alt="${movie.Title} poster">
                                <p>Genre: ${movieDetails.Genre}</p>
                                <p class="c-test">Rated: ${movieDetails.Rated}</p>
                            `;
                            resultsDiv.appendChild(movieDiv);
                            listentoclick(); 
                        })
                        .catch((detailsError) => {
                            console.error(detailsError);
                        });
                });
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch((error) => {
            console.error(error);
        });
});
