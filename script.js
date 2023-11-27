const apikey = 'e37a3da0';


const getMovieDetails = async function(titleText) {
    const searchUrl = `https://www.omdbapi.com/?apikey=${apikey}&t=${encodeURIComponent(titleText)}`;

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


        console.log(poster)
        return data
        if (data) {


        }
         
        else {
            return 'default_poster_url.jpg'; 
        }
    
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return 'default_poster_url.jpg'; 
    }
};

const listenToHover = function (){
    const posters = document.querySelectorAll(".js-poster");
    for (const poster of posters){
        const title = poster.querySelector('.c-title')
        poster.addEventListener('mouseover',function(){
            title.classList.remove('hidden')
            console.log("not")
        })
        poster.addEventListener('mouseout',function(){
            title.classList.add('hidden')
            console.log("Hidden")
        })
    }
}

const showMovieposters = async function () {
    const Titlescontext = document.querySelectorAll(".js-title");

    Titlescontext.forEach(async (title) => {
        const titletext = title.textContent.trim();
        const poster = await getMovieDetails(titletext);
        const genre = poster.Genre
        console.log(genre)        

        const posterContainer = title.closest('.c-poster');

        if (posterContainer) {
            posterContainer.insertAdjacentHTML('afterbegin', `<img src="${poster.Poster}" alt="${titletext} Poster" class="c-poster-img js-poster-img">`);
        }
    })
    listenToHover();
}

const listenToClick =  async function (){
    const searchbutton = document.querySelector('.js-search-button')
    searchbutton.addEventListener('click', function (){
        console.log("clicked")
        let Title = readSearchText()
        getMovieSearch(Title)
        .then(function () {
            
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    })

}

const readSearchText = function () {
    const Searchbartext = document.querySelector('.js-search').value;
    console.log(Searchbartext)
    return Searchbartext
    
}

const getMovieSearch = function (titleText) {
    const searchUrl = `https://www.omdbapi.com/?apikey=${apikey}&s=${encodeURIComponent(titleText)}&type=movie`;

    return fetch(searchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const movies = data.Search;

            const movieTitles = movies.map(movie => movie.Title);

            const sortedMovieTitles = movieTitles.sort();

            ShowMovieSearch(sortedMovieTitles);
            showMovieposters(sortedMovieTitles);
            return sortedMovieTitles;
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            return ['default_poster_url.jpg'];
        });
};



const ShowMovieSearch = function (movies) {
    console.log("HELOOOOOO", movies);
    var titles = document.querySelectorAll('.js-title');
    var posters = document.querySelectorAll('.js-poster-img');

    titles.forEach(function (title) {
        title.innerHTML = '';
    });

    posters.forEach(function (poster) {
        poster.remove();
    });

    movies.forEach(function (movie, index) {
        var title = titles[index];
        title.innerHTML = movie;

    });

    console.log("added");
};

const init = function () {
          showMovieposters()    
  };
  document.addEventListener('DOMContentLoaded', init);
  listenToClick()
