const apikey = 'e37a3da0';

const updateRatingBar = function (rating) {
    const filler = document.getElementById('filler');
    const ratingSpan = document.querySelector('.js-rating-value');
    rating = Math.max(0, Math.min(100, rating));

    filler.style.width = rating + '%';

    ratingSpan.textContent = rating;
}


const getMoviePoster = async function(titleText) {
    const searchUrl = `https://www.omdbapi.com/?apikey=${apikey}&t=${encodeURIComponent(titleText)}`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data && data.Poster) {
            return data;
        } else {
            return null;
        }
        
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null; 
    }
};

const listenToHover = function () {
    const posters = document.querySelectorAll(".js-poster");
    
    for (const poster of posters) {
        const title = poster.querySelector('.c-title');

        poster.addEventListener('mouseover', function () {
            title.classList.remove('hidden');
        });

        poster.addEventListener('mouseout', function () {
            title.classList.add('hidden');
        });
    }
};

const showMovieposters = async function () {
    const Titlescontext = document.querySelectorAll(".js-title");
    const posterPromises = [];

    for (const [index, title] of Titlescontext.entries()) {
        const titletext = title.textContent.trim();
        const posterPromise = getMoviePoster(titletext)
            .then(poster => {
                const posterContainer = title.closest('.c-poster');

                if (posterContainer) {
                    const imgElement = document.createElement('img');
                    imgElement.src = poster.Poster;
                    imgElement.alt = `${titletext} Poster`;
                    imgElement.classList.add('c-poster-img', 'js-poster-img', 'loading');

                    const delay = 0.1 * index;
                    imgElement.style.transitionDelay = `${delay}s`;

                    posterContainer.insertAdjacentElement('afterbegin', imgElement);

                    setTimeout(() => {
                        imgElement.classList.remove('loading');
                    }, 100);
                }
            });

        posterPromises.push(posterPromise);
    }

    await Promise.all(posterPromises);
};

const listenToClicks =  async function (){
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

const CloseBox = async function(){
    const closebutton = document.querySelector('.js-close-button')
    const infobox = document.querySelector('.c-infobox')
    closebutton.addEventListener('Click', function (){
        console.log("jowwwwwwww")
        
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
            const moviesAndSeriesWithPoster = data.Search.filter(item => 
                (item.Type === 'movie' || item.Type === 'series') && item.Poster && item.Poster !== 'N/A'
            );

            const uniqueTitles = [...new Set(moviesAndSeriesWithPoster.map(item => item.Title))];
            
            const sortedTitles = uniqueTitles.sort();

            ShowMovieSearch(sortedTitles);
            showMovieposters(sortedTitles);
            listenToClickMovieTitle();
        })
        .catch(error => {
            console.error('Error fetching movie and series data:', error);
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
        title.innerHTML = `<span>${movie}</span>`;

    });

    console.log("added");
};

const listenToClickMovieTitle = async function () {
    document.addEventListener('click', function (event) {
        const clickedElement = event.target.closest('.js-poster');

        if (clickedElement) {
            const movietitle = clickedElement.textContent;
            console.log(movietitle);

            getMovieDetails(movietitle);
        }
    });
};

const Reloadpage = async function () {
    const logo = document.querySelector('.js-logo')
    logo.addEventListener('click', function(){
        location.reload()
    })


}



const getMovieDetails = async function(titleText) {
    var spanElement = document.querySelector('.js-rating-value');
    var stringValue = spanElement.textContent;
    console.log('String value:', stringValue);
    const searchUrl = `https://www.omdbapi.com/?apikey=${apikey}&t=${encodeURIComponent(titleText)}&plot=full`;
    
    
    const titlebox = document.querySelector('.c-title-box')
    const genrebox = document.querySelector('.c-genre-box')
    const plotbox = document.querySelector('.c-plot')
    const rating = document.querySelector('.c-rating')
    const metascore  = document.querySelector('.c-meta-score')
    const imdb  =document.querySelector('.c-imdb')
    const time = document.querySelector('.c-runtime')
    const bar = document.querySelector('.c-meta-score')
    const kid = document.querySelector('.js-kid')
    const teen = document.querySelector('.js-teen');
    const adult = document.querySelector('.js-adult')
    const movieposterbox = document.querySelector('.js-poster-box')
    const releaseyear = document.querySelector('.js-year')
    const toggle = document.querySelector('.toggle')
    


    try {
        toggle.classList.add('hidden')  
        titlebox.classList.remove('hidden')
        const response = await fetch(searchUrl);
        const data = await response.json();
        const title = data.Title
        const poster= data.Poster;
        const year = data.Year
        const Metascore = data.Metascore;
        const runtime = data.Runtime;
        const imdbrating = data.imdbRating;
        const genre =  data.Genre;
        const rated = data.Rated
        const plot = data.Plot

        
        displayStars(imdbrating)
        if (stringValue == "N/A" || stringValue == "NaN") {
            console.log("Hello");
            bar.style.display = "none";
        } else {
            bar.style.removeProperty("display");
        }
        if (rated == "R" || rated == "TV-MA"){
            console.log("ARRRR TV-MA")
            adult.style.opacity=1
        }
        else{
            adult.style.opacity=0.1

        }

        if (rated == "PG-13" || rated == "TV-Y7-FV" || rated == "TV-14" || rated == "TV-PG"){
            teen.style.opacity=1
            console.log("tienerrr")
            

        }
        else{
            teen.style.opacity=0.1

        }
        if (rated == "PG" || rated == "TV-G"){
            console.log("Kind")
            kid.style.opacity = 1;

        }
        else{
            kid.style.opacity=0.1

        }

        updateRatingBar(Metascore);
        CloseBox()
       

        const apiDataBox = document.getElementById('apiDataBox');

        titlebox.innerHTML = title
        genrebox.innerHTML = genre
        movieposterbox.innerHTML = `<img src="${poster}" alt="${title} Poster" class="c-poster-img js-poster-img">`
        plotbox.innerHTML = `<h3>Plot:</h3> ${plot}`
        // rating.innerHTML = rated
        time.innerHTML = runtime
        imdb.innerHTML = `${imdbrating/2} out of 5 rating:`
        releaseyear.innerHTML = year

        return data
        
    
    } catch (error) {
        console.error('Error fetching movie details:', error);
        // return 'default_poster_url.jpg'; 
    }
};


const Moviefilter = function () {
    const movieFilterButton = document.querySelector('.js-movies')
    movieFilterButton.addEventListener('click', function(){
        console.log("Hii sorted by movies")
        ShowBestSeries(movieTitles)
    })


}

const Seriesfilter = function () {
    const movieFilterButton = document.querySelector('.js-series')
    movieFilterButton.addEventListener('click', function(){
        console.log("Hii sorted by series")
        ShowBestSeries(top12Series)
    })


}

const movieTitles = [
    "Shawshank Redemption",
    "The Godfather",
    "Oppenheimer",
    "The Godfather Part II",
    "Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
    "Pulp Fiction",
    "The Lord of the Rings: The Fellowship of the Ring",
    "The Good, the Bad and the Ugly",
    "Forrest Gump",
    "Fight Club"
];



const top12Series = [
    "Breaking Bad",
    "Planet Earth II",
    "Planet Earth",
    "Band of Brothers",
    "Chernobyl",
    "The Wire",
    "Avatar: The Last Airbender",
    "Blue Planet II",
    "The Sopranos",
    "Cosmos: A Spacetime Odyssey",
    "Cosmos",
    "Our Planet"
  ]

const ShowBestSeries = function(top12Series) {
    console.log(top12Series)
    ShowMovieSearch(top12Series)
    showMovieposters(top12Series)

}


function showPoster(clickedPoster) {
    var posters = document.querySelectorAll('.js-poster');
    var range =document.querySelector('.js-poster-range')
    posters.forEach(function(poster) {

            poster.classList.add('hidden');
            range.classList.add('hidden');
        })
    ;
    // listenToClick()
    var title = clickedPoster.querySelector('.js-title');
    title.classList.remove('hidden');
    const infobox = document.querySelector('.c-infobox');
    infobox.style.display = 'flex';
    
    document.startViewTransition(function() {
       
        posters.forEach(function(poster) {
            if (poster !== clickedPoster) {
                poster.classList.add('hidden');
            }
        });
    });
}

function showAllPosters() {
    var posters = document.querySelectorAll('.js-poster');

    posters.forEach(function(poster) {
        poster.classList.remove('hidden');
    });

    var titles = document.querySelectorAll('.js-title');
    titles.forEach(function(title) {
        title.classList.add('hidden');
    });

    // document.startViewTransition(function() {
       
    //     posters.forEach(function(poster) {
    //         poster.classList.remove('hidden');
    //     });
    ;
    // listenToClick()
}



const listenToClick = async function() {
    const searchButton = document.querySelector('.js-search-button');
    const closebutton =  document.querySelector('.js-close-button')
    const infobox = document.querySelector('.c-infobox');
    const toggle = document.querySelector('.toggle');
    const postersrange = document.querySelector('.js-poster-range');
    console.log(closebutton
    )
    
    searchButton.addEventListener('click', function() {
        toggle.classList.add('hidden')

        console.log("Search button clicked");
        let title = readSearchText();
        getMovieSearch(title)
            .then(function() {
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
    });
    closebutton.addEventListener('click', function(){
        console.log("Close button clicked");
        toggle.classList.remove('hidden')
        infobox.style.display = 'none'
        postersrange.classList.remove('hidden')
        showAllPosters()
        
    })

    const posters = document.querySelectorAll('.js-poster');
    posters.forEach(function(poster) {
        poster.addEventListener('click', function() {
            console.log("Poster clicked");
            showPoster(this);
        });
    });
}




// listenToClick();



const displayStars = function(score) {
    const svgString = `<svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" fill="#FFD700"/>
</svg>`;

    const halfStarSvg = `<svg fill="#FFD700" width="36px" height="36px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>half-star-solid</title>
      <path class="clr-i-solid clr-i-solid-path-1" d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24ZM24.9,23.11l2.45,8.64A.22.22,0,0,1,27,32l-7.46-5a2.21,2.21,0,0,0-1.24-.38h0V4.44h0a.2.2,0,0,1,.21.15L21.62,13a2.22,2.22,0,0,0,2,1.46l9,.34a.22.22,0,0,1,.13.4l-7.06,5.55A2.21,2.21,0,0,0,24.9,23.11Z"></path>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
    </svg>`;

    const totalStars = 10;
    const filledStars = Math.floor(score / 2);
    const hasHalfStar = score % 2 !== 0;

    let filledSvg = svgString.repeat(filledStars);

    if (hasHalfStar) {
      filledSvg += halfStarSvg;
    }

    document.getElementById('starContainer').innerHTML = filledSvg;
  }

  displayStars(5);


  const toggleBox = function() {
    const infobox = document.querySelector('.c-infobox');
    if (infobox.classList.contains('hidden')) {
        // Box is currently hidden, show it
        infobox.classList.remove("hidden");
    } else {
        // Box is currently shown, hide it
        infobox.classList.add('hidden');
    }
};

const init = function () {
        listenToClickMovieTitle() 
        listenToClick()
        showMovieposters()   


  };

document.addEventListener('DOMContentLoaded', init);
Reloadpage()
Moviefilter()
Seriesfilter()
// listenToHover()
