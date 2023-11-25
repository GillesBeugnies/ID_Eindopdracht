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
            return 'default_poster_url.jpg'; // Replace with a default poster URL or handle missing poster
        }
    
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return 'default_poster_url.jpg'; // Replace with a default poster URL or handle errors
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
            posterContainer.insertAdjacentHTML('afterbegin', `<img src="${poster.Poster}" alt="${titletext} Poster" class="c-poster-img">`);
        }
    })
    listenToHover();
}




const init = function () {
    showMovieposters()
    
 
    
    
    
  };
  document.addEventListener('DOMContentLoaded', init);