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

const clicktest = function(){
    const genres =  document.querySelectorAll('.js-genre');
    genres.forEach((genre) =>{
        genre.addEventListener('click',function(){
            const genreid = genre.getAttribute('data-genre-id')     
            console.log(`Genre ${genreid}`)
        })
    }
    )
}

const movieContainer = document.querySelector('.js-movie');

const getMovieDetails = async function(titleText) {
    const searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(titleText)}`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.Poster) {
            return data.Poster;
        } else {
            return 'default_poster_url.jpg'; // Replace with a default poster URL or handle missing poster
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return 'default_poster_url.jpg'; // Replace with a default poster URL or handle errors
    }
};

const getMovieTitles = function () {
    const titles = movieContainer.querySelectorAll('.title');

    titles.forEach(async (title) => {
        const titleText = title.textContent.trim();
        console.log(titleText);

        const posterUrl = await getMovieDetails(titleText);

        const posterElement = document.createElement('img');
        posterElement.src = posterUrl;
        posterElement.alt = `${titleText} Poster`;
        title.parentNode.appendChild(posterElement);
    });
};





document.getElementById('search-button').addEventListener('click', function () {
    const searchTerm = document.getElementById('search').class;
    const selectedGenre = document.getElementById('genre-filter').class;
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


clicktest()
getMovieTitles()
