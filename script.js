const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main=document.getElementById('main')
const form=document.getElementById('form')
const search=document.getElementById('search')

getMovies(APIURL);

async function getMovies(url){
    const disp= await fetch(url);
    const dispData= await disp.json();

    // console.log(dispData)
    
    showMovies(dispData)

    return dispData
}
 
function showMovies(movies){


   main.innerHTML='';


   movies.results.forEach((movie) => {
        
        const movieElt= document.createElement('div');
        movieElt.classList.add('movie');
        const date=movie.release_date;
        const year=date.slice(0,4)
        movieElt.innerHTML=`
        <img src="${IMGPATH+movie.poster_path}" alt="${movie.title}" srcset="">
        <div class="titleInfo">
            <h3>${movie.title}</h3>
            <span class=${getClassByRate(movie.vote_average)}>${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h4>Year: ${year}</h4>
            <h4>Overview:</h4>
            ${movie.overview}
        </div>
        
        `;

        main.appendChild(movieElt)
        console.log(movie)
        });

}

function getClassByRate(vote){
      if(vote>=8) return 'green';
      else if(vote>=5) return 'yellow';
      else return 'red';
}
form.addEventListener('submit',e=>{
    e.preventDefault();
    const searchTerm= search.value;

    if(searchTerm){
        getMovies(SEARCHAPI+searchTerm)
        search.value='';
    }

});