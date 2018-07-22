class AddToList{
    constructor(){
        this.addedLists = {
            favourite: []            
        };        
    }

    initialGetStorageValue() {
        const locaAddedList = localStorage.getItem('addToLists');
        if(localStorage === null) {
            this.addedLists = {
                favourite: []            
            };
        } else {            
            this.addedLists = JSON.parse(locaAddedList);
        }
    }

    storeInLocalStorage(value) {
        localStorage.setItem("addToLists", value)
    }

    init() {
       this.bindEvents();
       if(document.getElementById('list-group')) {
        this.showLists();
       }
       this.initialGetStorageValue();
       
    }

    showLists(selectedList = 0) {
        const localStorageLists = localStorage.getItem('addToLists');
        const objectKeys = Object.keys(JSON.parse(localStorageLists));
        if(objectKeys.length) {
            let listNames = '';
            objectKeys.map((val, index) => {
                listNames += `<li class="list-group-item ${(selectedList == index) ? "selected": ""}" data-list-id=${index}>${val}</li>`
            })
            document.getElementById('list-group').innerHTML = listNames;

            this.showMovieList(selectedList, objectKeys[selectedList], localStorageLists);
        }
    }  
    
    showMovieList(index = 0, category, localStorageLists) {
        const listsMovies = document.getElementById('add-to-lists');
        let addtoListsMovies = '';
        const localStorageJSON = JSON.parse(localStorageLists);
        localStorageJSON[category].map((data) => {
            addtoListsMovies += `<div class="col-sm-4">
                <div class="card">
                <img class="card-img-top" src="http://image.tmdb.org/t/p/w342/${data.poster_path}">
                <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <h6 class="">Release Date: ${data.release_date}</h6>
                <p class="card-text">Popularity: ${data.popularity}</p>
                <button class="btn btn-primary add-to-list" data-movieId="${data.id}">Remove from List</button>
                </div></div>
                </div>`
        })

        listsMovies.innerHTML = addtoListsMovies;

    }
    
    addListNames() {

    }

    addListsMovies() {

    }

    bindEvents() {
        if(document.getElementById('movie-lists')) {
            const containerEle = document.getElementById('movie-lists');
            const that = this;
            console.log()
            containerEle.addEventListener('click', function(e) {
                if(e.target.className == "btn btn-primary add-to-list") {
                    const addedLists = movie.movieLists.filter((movie) => {
                        e.target.setAttribute('disabled', true);
                        e.target.innerHTML = "Added to List";
                        return movie.id == e.target.getAttribute('data-movieid');
                    }) 
                    that.addedLists.favourite = [...that.addedLists.favourite , ...addedLists];
                }
                that.storeInLocalStorage(JSON.stringify(that.addedLists));            
            })

        }

        if(document.getElementById('list-group')) {
            const movieListsContainer = document.getElementById('list-group');
            movieListsContainer.addEventListener('click', function(e){
                if(e.target.nodeName == "LI") {
                    this.showLists(e.target.getAttribute('data-list-id'))
                }
            })
        }
    }

}

const addToList = new AddToList();
addToList.init();