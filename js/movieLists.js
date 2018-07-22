const API_KEY = "032a51d75439320da927942f2f2a199a";

class MovieLists{
    constructor() {
        this.movieLists = []
    }
                   
    getMoviesList (searchTerm) {
        var that = this;
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
        .then(data => data.json())
        .then(data => this.movieLists = data.results)
    }

    async displayMovieLists (searchTerm) {
        const data = await this.getMoviesList(searchTerm);
        let finalMovieList = "";
        const lists = this.movieLists.map(movie => {
            finalMovieList += this.createMovieCard(movie);            
        }) 
        document.getElementsByClassName('movie-lists')[0].innerHTML = finalMovieList;
    }

    createMovieCard(data) {
        let divCard;        
        return divCard = `<div class="col-sm-3">
            <div class="card">
            <img class="card-img-top" src="http://image.tmdb.org/t/p/w342/${data.poster_path}">
            <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <h6 class="">Release Date: ${data.release_date}</h6>
            <p class="card-text">Popularity: ${data.popularity}</p>
            <button class="btn btn-primary add-to-list" data-movieId="${data.id}">Add to List</button>
            </div></div>
        </div>`;
    }

    init() {
        if(document.getElementById('movieSearch')) {
            document.forms['movieSearch'].addEventListener('submit', (e) => {
                e.preventDefault();
                const inputValue = document.getElementById('searchTerm').value;                    
                this.displayMovieLists(inputValue);
            });
        }
    }

}

let movie = new MovieLists();
movie.init()
