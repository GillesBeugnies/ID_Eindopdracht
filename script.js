const apiKey = 'e37a3da0';

const listentoclick =  function () {
    const filmposters = document.querySelectorAll('.js-poster');
    filmposters.forEach((poster) => {
        poster.addEventListener('click', function () {
            let titleText = poster.alt; // Assuming alt attribute contains movie title
            titleText = titleText.replace(/poster/i, '').trim()
            console.log(`tes ${titleText}`)
            const posterUrl =  getMovieDetails(titleText);
            
            console.log('Poster URL:', posterUrl);
        
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
        const poster= data.Poster;
        const year = data.Year
        const Metascore = data.Metascore;
        const runtime = data.Runtime;
        const imdbrating = data.imdbRating;
        const genre =  data.Genre;
        const rated = data.Rated
        const plot = data.Plot


        console.log(poster,year,Metascore,runtime,imdbrating,genre,rated,plot)
        return data
        if (data) {


        }
         
        else {
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

        
            const data = await getMovieDetails(titleText);

            console.log(titleText);

            const posterElement = document.createElement('img');
            posterElement.src = data.Poster;
            posterElement.alt = `${titleText} Poster`;
            posterElement.classList.add('c-poster');
            posterElement.classList.add('js-poster');

            const description = document.createElement('p');
            description.classList.add('js-description');

            title.parentNode.appendChild(posterElement);
            title.parentNode.appendChild(description);

            const test = document.querySelector('.js-description');
            test.innerHTML = data.Rated; // Use innerHTML to set content

            console.log(`hallo ${data.Plot}`);
        posterElement.addEventListener('click',function(){
            const movieDetails =  getMovieDetails(titleText);
            console.log('Movie details:', movieDetails);
        })
    });
};





document.getElementById('search-button').addEventListener('click', function () {
    const searchTerm = document.querySelector('.js-search').value;
    console.log(searchTerm);
    const selectedGenre = document.getElementById('genre-filter').class;
    let url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}&type=movie`;
    console.log(url)
    const  movieList = document.querySelector('.js-movie')
    movieList.innerHTML = '';
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
                    const detailsUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&type=movie`;

                    fetch(detailsUrl)
                        .then((detailsResponse) => detailsResponse.json())
                        .then((movieDetails) => {
                            const movieDiv = document.createElement('div');
                            const posterId = movie.imdbID; 
                            movieDiv.innerHTML = `
                                <h2>${movie.Title}</h2>
                                <p>IMDb ID: ${movie.imdbID}</p>
                                <p>${movie.Year}</p>
                                <img class="js-poster c-poster" id="poster" data-poster-id="${posterId}" src="${movie.Poster}" alt="${movie.Title} poster">
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
listentoclick()