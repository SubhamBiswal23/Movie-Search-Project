const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');

//function to fetch movie details using api
const getMovieInfo=async(movie)=>{

    try{
        const myapikey="d8c366bb";
        const url=`http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
    
        const response= await fetch(url);
        if(!response.ok){
            throw new Error("unable to fetch data");
        }
        const data=await response.json();
    
       showMovieData(data);
    }
    catch(error){
        showErroeMessage("No movie found!!")
    }
  
    
}


//function to show movie data on screen
const showMovieData=(data)=>{
    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');
    //use destructuring assignment to extract properties from data object

    const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;

    const movieElement=document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML=`<h2>${Title}</h2>
    <p><strong>Rating: &#11088</strong>${imdbRating}</P>`;

    const movieGenreElement=document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element=>{
        const p=document.createElement('p');
        p.innerText=element;
        movieGenreElement.appendChild(p);
    })

    movieElement.append(movieGenreElement);

    movieElement.innerHTML+=`<p><strong>Released Date: &#11088</strong>${Released}</P>
    <p><strong>Duration: </strong>${Runtime}</P>
    <p><strong>Cast:</strong>${Actors}</P>
    <p><strong>Plot:</strong>${Plot}</P>`;

    //creating a div for movie poster

    const moviePosterElement=document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML=`<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

//function to display error message

const showErroeMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}


//fonction to handle the form submission
const handleFormSubmission=(e)=>{
    e.preventDefault();
    
    const movieName=inputBox.value.trim();
    if(movieName!==''){
        showErroeMessage("fetching movie information");
        getMovieInfo(movieName);
    }
    else{
       showErroeMessage("Enter movie name to get movie information");

    }
}
//adding event listner to search form
searchForm.addEventListener('submit',handleFormSubmission);

